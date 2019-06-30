FROM microsoft/dotnet:2.2-sdk AS build-env
WORKDIR /app/

# Copy csproj and restore as distinct layers
COPY *.csproj ./
RUN dotnet restore

# Copy everything else and build
COPY . ./
RUN dotnet publish -c Release -o out

# Build runtime image
FROM microsoft/dotnet:2.2-aspnetcore-runtime
# WORKDIR /app
COPY --from=build-env /app/out .

#EXPOSE Ports

EXPOSE 5001/tcp
ENV ASPNETCORE_URLS http://*:5001
HEALTHCHECK --interval=30s --timeout=3s --retries=1 CMD curl --silent --fail http://localhost:5001/hc || exit 1


ENTRYPOINT ["dotnet", "FlightManagement.dll"]