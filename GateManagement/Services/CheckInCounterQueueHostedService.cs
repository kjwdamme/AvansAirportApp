using GateManagement.Models;
using GateManagement.Repositories;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Newtonsoft.Json;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace GateManagement.Services
{
    public class CheckInCounterQueueHostedService : Microsoft.Extensions.Hosting.BackgroundService
    {
        private IConnection _connection;
        private IModel _counterChannel;
        private readonly IServiceScopeFactory _scopeFactory;

        public CheckInCounterQueueHostedService(IServiceScopeFactory scopeFactory)
        {
            InitRabbitMQ();
            _scopeFactory = scopeFactory;
        }

        private void InitRabbitMQ()
        {
            var factory = new ConnectionFactory { HostName = "rabbitmq" };

            // create connection  
            _connection = factory.CreateConnection();

            // create channel  
            _counterChannel = _connection.CreateModel();

            _counterChannel.QueueDeclare(queue: "CheckInCounterQueue",
                                         durable: false,
                                         exclusive: false,
                                         autoDelete: false,
                                         arguments: null);

            _connection.ConnectionShutdown += RabbitMQ_ConnectionShutdown;
        }

        protected override Task ExecuteAsync(CancellationToken stoppingToken)
        {
            stoppingToken.ThrowIfCancellationRequested();

            var counterConsumer = new EventingBasicConsumer(_counterChannel);
            counterConsumer.Received += (ch, ea) =>
            {
                using (var scope = _scopeFactory.CreateScope())
                {
                    var counterRepository = scope.ServiceProvider.GetRequiredService<CheckInCounterRepository>();

                    // Received message
                    var content = Encoding.UTF8.GetString(ea.Body);

                    QueueReceivedModel contentModel = JsonConvert.DeserializeObject<QueueReceivedModel>(content);

                    counterRepository.AssignCheckInCounter(contentModel.FlightId, contentModel.OpeningTime, contentModel.ClosingTime);
                }
                _counterChannel.BasicAck(ea.DeliveryTag, false);
            };

            counterConsumer.Shutdown += OnConsumerShutdown;
            counterConsumer.Registered += OnConsumerRegistered;
            counterConsumer.Unregistered += OnConsumerUnregistered;
            counterConsumer.ConsumerCancelled += OnConsumerConsumerCancelled;

            _counterChannel.BasicConsume("CheckInCounterQueue", false, counterConsumer);

            return Task.CompletedTask;
        }

        private void HandleMessage(string content)
        {
            // we just print this message   
            Console.WriteLine($"consumer received {content}");
        }

        private void OnConsumerConsumerCancelled(object sender, ConsumerEventArgs e) { }
        private void OnConsumerUnregistered(object sender, ConsumerEventArgs e) { }
        private void OnConsumerRegistered(object sender, ConsumerEventArgs e) { }
        private void OnConsumerShutdown(object sender, ShutdownEventArgs e) { }
        private void RabbitMQ_ConnectionShutdown(object sender, ShutdownEventArgs e) { }

        public override void Dispose()
        {
            _counterChannel.Close();
            _connection.Close();
            base.Dispose();
        }
    }
}