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
    public class GateQueueHostedService : Microsoft.Extensions.Hosting.BackgroundService
    {
        private IConnection _connection;
        private IModel _gateChannel;
        private readonly IServiceScopeFactory _scopeFactory;

        public GateQueueHostedService(IServiceScopeFactory scopeFactory)
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
            _gateChannel = _connection.CreateModel();

            _gateChannel.QueueDeclare(queue: "GateQueue",
                                  durable: false,
                                  exclusive: false,
                                  autoDelete: false,
                                  arguments: null);

            _connection.ConnectionShutdown += RabbitMQ_ConnectionShutdown;
        }

        protected override Task ExecuteAsync(CancellationToken stoppingToken)
        {
            stoppingToken.ThrowIfCancellationRequested();

            var gateConsumer = new EventingBasicConsumer(_gateChannel);
            gateConsumer.Received += (ch, ea) =>
            {
                Console.WriteLine("Received from queue!");
                
                using (var scope = _scopeFactory.CreateScope())
                {
                    var gateRepository = scope.ServiceProvider.GetRequiredService<GateRepository>();

                    // Received message
                    var content = Encoding.UTF8.GetString(ea.Body);

                    QueueReceivedModel contentModel = JsonConvert.DeserializeObject<QueueReceivedModel>(content);

                    gateRepository.AssignGate(contentModel.FlightId, contentModel.OpeningTime, contentModel.ClosingTime);
                }

                _gateChannel.BasicAck(ea.DeliveryTag, false);
            };

            gateConsumer.Shutdown += OnConsumerShutdown;
            gateConsumer.Registered += OnConsumerRegistered;
            gateConsumer.Unregistered += OnConsumerUnregistered;
            gateConsumer.ConsumerCancelled += OnConsumerConsumerCancelled;

            _gateChannel.BasicConsume("GateQueue", false, gateConsumer);

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
            _gateChannel.Close();
            _connection.Close();
            base.Dispose();
        }
    }
}