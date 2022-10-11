import * as pulumi from '@pulumi/pulumi';
import * as awsx from '@pulumi/awsx';
import { dockerfilePath } from '../Dockerfilepath';

const config = new pulumi.Config();

export const githubAccessToken = config.requireSecret('github_access_token');

// Step 1: Create an ECS Fargate cluster.
const cluster = new awsx.ecs.Cluster('cluster');

// Step 2: Define the Networking for our service.
const alb = new awsx.elasticloadbalancingv2.ApplicationLoadBalancer('net-lb', {
  external: true,
  securityGroups: cluster.securityGroups,
});
const web = alb.createListener('web', {
  port: 3000,
  external: true,
  protocol: 'HTTP',
});

// Step 3: Build and publish a Docker image to a private ECR registry.
const img = awsx.ecs.Image.fromPath('app-img', dockerfilePath);

// Step 4: Create a Fargate service task that can scale out.
const appService = new awsx.ecs.FargateService('app-svc', {
  cluster,
  taskDefinitionArgs: {
    container: {
      image: img,
      cpu: 102,
      memory: 50,
      portMappings: [web],
      environment: [
        {
          name: 'GITHUB_ACCESS_TOKEN',
          value: githubAccessToken,
        },
      ],
    },
  },
  desiredCount: 5,
});
// Step 4: Create a Fargate service task that can scale out.

// Step 5: Export the Internet address for the service.
export const url = web.endpoint.hostname;
