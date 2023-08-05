const engagementHelper = {
    engagementMessageOverTimeChartOptions: (messageCountList, channels) => {
      // Filter channels with messages on more than 1 date
      const filteredChannels = channels.filter((channel) => {
        // Check if the channel has messages on more than 1 date
        const channelMessageCount = messageCountList.filter(
          (message) => message.channelId === channel.id
        );
        return channelMessageCount.length > 1;
      });
  
      console.log(filteredChannels);
      // Generate data series for each channel with messages on more than 1 date
      const seriesData = filteredChannels.map((channel) => {
        return {
          name: channel.name,
          data: messageCountList
            .filter((message) => message.channelId === channel.id)
            .map((message) => ({
              x: new Date(message.timeBucket).getTime(),
              y: parseInt(message.count,10), 
            })),
        };
      });
      console.log(seriesData);
      const options = {
        chart: {
          type: "spline",
        },
        xAxis: {
          type: "datetime",
        },
        yAxis: {
          title: {
            text: "Message Count",
          },
        },
        series: seriesData,
      };
  
      return options;
    },
  };
  
  export default engagementHelper;