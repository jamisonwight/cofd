// For performance testing
const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      ga('send', 'event', {
        eventCategory: 'Performance Metrics',
        eventAction: 'longtask',
        eventValue: Math.round(entry.startTime + entry.duration),
        eventLabel: JSON.stringify(entry.attribution),
      });
    }
  });
  
  observer.observe({entryTypes: ['longtask']});
  