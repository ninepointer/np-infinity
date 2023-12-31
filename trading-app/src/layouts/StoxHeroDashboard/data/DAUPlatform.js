import * as echarts from 'echarts';
import React, { useEffect, useRef } from 'react';
import MDBox from '../../../components/MDBox';
import moment from 'moment';

export default function Charts({dailyActiveUsersPlatform}) {
    const chartRef = useRef(null);
  // Dummy data for example purposes
  const data = [
    { date: '2023-07-01', virtual: 150, contest: 100, tenx: 200, total: 450 },
    { date: '2023-07-02', virtual: 120, contest: 80, tenx: 180, total: 380 },
    { date: '2023-07-03', virtual: 180, contest: 150, tenx: 220, total: 550 },
    // Add more data entries for each date
  ];

  useEffect(() => {
    const chart = echarts.init(chartRef.current);

  const options = {
    title: {
      text: 'DAUUs (Platform)',
      left: 'left',
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          crossStyle: {
            color: '#999'
          }
        }
    },
    toolbox: {
      feature: {
        dataView: { show: true, readOnly: true },
        magicType: { show: true, type: ['line', 'bar'] },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    legend: {
        data: ['Active Users'],
    },
    grid: {
        right: '2%', // Adjust the right margin as per your requirement
        left: '2%',
        bottom: '2%',
        containLabel: true
    },
    // xAxis: {
    //   type: 'category',
    //   data: data.map(item => item.date),
    // },
    xAxis: [
        {
          type: 'category',
          data: dailyActiveUsersPlatform.map(item => 
            moment.utc(((new Date(item.date)).toLocaleString("en-US", { timeZone: "UTC" }))).utcOffset('+00:00').format('DD-MMM')),
          axisPointer: {
            type: 'shadow'
          }
        }
    ],
    // yAxis: {
    //   type: 'value',
    // },
    yAxis: [
        {
          type: 'value',
        //   name: 'Net P&L/100',
          // min: npnlMin,
          // max: npnlMax,
          // interval: parseInt(interval),
          axisLabel: {
            formatter: `{value}`
          }
        },
    ],
    series: [
      {
        name: 'Active Users',
        type: 'line',
        data: dailyActiveUsersPlatform.map(item => item.uniqueUsersCount),
      },
      // {
      //   name: 'Virtual Trading',
      //   type: 'bar',
      //   data: dailyActiveUsersPlatform.map(item => item.virtualTrading),
      // },
      // {
      //   name: 'Contest',
      //   type: 'bar',
      //   data: dailyActiveUsersPlatform.map(item => item.contest),
      // },
      // {
      //   name: 'TenX Trading',
      //   type: 'bar',
      //   data: dailyActiveUsersPlatform.map(item => item.tenXTrading),
      // },
    ],
  };

  chart.setOption(options);

  return () => {
    chart.dispose();
  };
}, [dailyActiveUsersPlatform]);

  return <MDBox ref={chartRef} style={{ minWidth: '100%', height: '400px' }} />;
};
