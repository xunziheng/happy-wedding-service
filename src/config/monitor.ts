export default {
  pageTitle: 'Wedding 监控页面',
  port: 5173, // 端口要与service的端口一致
  path: '/status', // 查看监控信息的页面地址 localhost:3000/status
  ignoreStartsWith: '/healt/alive',
  spans: [
    {
      interval: 1, // Every second
      retention: 60, // Keep 60 datapoints in memory
    },
    {
      interval: 5, // Every 5 seconds
      retention: 60,
    },
    {
      interval: 15, // Every 15 seconds
      retention: 60,
    },
  ],
  chartVisibility: {
    cpu: true,
    mem: true,
    load: true,
    responseTime: true,
    rps: true,
    statusCodes: true,
  },
  healthChecks: [],
};
