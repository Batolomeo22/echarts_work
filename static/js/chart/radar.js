var jsonData = [
    {"comp":"青浦供电公司","efficient":0.746016601,"avgTime":0.791089744,"elecReliable":1,"qxEfficient":0.852112676,"maintainAssets":0.900763359},
    {"comp":"市南供电公司","efficient":0.800614891,"avgTime":0.807692308,"elecReliable":1,"qxEfficient":0.61971831,"maintainAssets":0.916030534},
    {"comp":"崇明供电公司","efficient":0.078774158,"avgTime":0.564102564,"elecReliable":1,"qxEfficient":0.549295775,"maintainAssets":0.732824427},
    {"comp":"嘉定供电公司","efficient":1.0,"avgTime":0.480769231,"elecReliable":1,"qxEfficient":0.816901408,"maintainAssets":0.641221374},
    {"comp":"市北供电公司","efficient":0.771299587,"avgTime":1.0,"elecReliable":1,"qxEfficient":0.408450704,"maintainAssets":0.778625954},
    {"comp":"金山供电公司","efficient":0.551379018,"avgTime":0.320512821,"elecReliable":1,"qxEfficient":0.697183099,"maintainAssets":0.755725191},
    {"comp":"松江供电公司","efficient":0.941393299,"avgTime":0.775641026,"elecReliable":1,"qxEfficient":1.0,"maintainAssets":0.801526718},
    {"comp":"市区供电公司","efficient":0.533742661,"avgTime":0.230769231,"elecReliable":1,"qxEfficient":0.816901408,"maintainAssets":0.86259542},
    {"comp":"奉贤供电公司","efficient":0.598787663,"avgTime":0.506410256,"elecReliable":1,"qxEfficient":0.929577465,"maintainAssets":0.961832061},
    {"comp":"长兴供电公司","efficient":0.182667012,"avgTime":0.846153846,"elecReliable":1,"qxEfficient":0.76056338,"maintainAssets":1.0},
    {"comp":"浦东供电公司","efficient":0.762710632,"avgTime":0.756410256,"elecReliable":1,"qxEfficient":0.830985915,"maintainAssets":0.885496183},
    {"comp":"检修公司","efficient":0.102938461,"avgTime":0.570512821,"elecReliable":1,"qxEfficient":0.788732394,"maintainAssets":0.595419847}]

var percData = [
    {"comp":"青浦供电公司","efficient":"74.60%","avgTime":"79.11%","elecReliable":"100.00%","qxEfficient":"85.21%","maintainAssets":"90.08%"},
    {"comp":"市南供电公司","efficient":"80.06%","avgTime":"80.77%","elecReliable":"100.00%","qxEfficient":"61.97%","maintainAssets":"91.60%"},
    {"comp":"崇明供电公司","efficient":"7.88%","avgTime":"56.41%","elecReliable":"100.00%","qxEfficient":"54.93%","maintainAssets":"73.28%"},{"comp":"嘉定供电公司","efficient":"100.00%","avgTime":"48.08%","elecReliable":"100.00%","qxEfficient":"81.69%","maintainAssets":"64.12%"},
    {"comp":"市北供电公司","efficient":"77.13%","avgTime":"100.00%","elecReliable":"100.00%","qxEfficient":"40.85%","maintainAssets":"77.86%"},
    {"comp":"金山供电公司","efficient":"55.14%","avgTime":"32.05%","elecReliable":"100.00%","qxEfficient":"69.72%","maintainAssets":"75.57%"},
    {"comp":"松江供电公司","efficient":"94.14%","avgTime":"77.56%","elecReliable":"100.00%","qxEfficient":"100.00%","maintainAssets":"80.15%"},
    {"comp":"市区供电公司","efficient":"53.37%","avgTime":"23.08%","elecReliable":"100.00%","qxEfficient":"81.69%","maintainAssets":"86.26%"},
    {"comp":"奉贤供电公司","efficient":"59.88%","avgTime":"50.64%","elecReliable":"100.00%","qxEfficient":"92.96%","maintainAssets":"96.18%"},
    {"comp":"长兴供电公司","efficient":"18.27%","avgTime":"84.62%","elecReliable":"100.00%","qxEfficient":"76.06%","maintainAssets":"100.00%"},
    {"comp":"浦东供电公司","efficient":"76.27%","avgTime":"75.64%","elecReliable":"100.00%","qxEfficient":"83.10%","maintainAssets":"88.55%"},
    {"comp":"检修公司","efficient":"10.29%","avgTime":"57.05%","elecReliable":"100.00%","qxEfficient":"78.87%","maintainAssets":"59.54%"}]
var chart;

$(function(){
    let $table = $('#tableDev');
    let chartDiv = $('#radarChart')[0];
    let myChart =  echarts.init(chartDiv);

    chart = myChart;
    
    $table.bootstrapTable({
        data: percData,
        onClickRow:function (row,$element) {
            let index = $element.data('index');
            let chartData = jsonData[index];
            console.log(chartData);

            refreshChartOption(chartData)
        }
    })

    let option =  {
        title: {
            text: '青浦供电公司'
        },
        tooltip: {},
        radar: {
            // shape: 'circle',
            name: {
                textStyle: {
                    color: '#fff',
                    backgroundColor: '#999',
                    borderRadius: 3,
                    padding: [3, 5]
                }
            },
            indicator: [
                { name: '设备运维人工效率', max: 100},
                { name: '平均年限', max: 100},
                { name: '供电可靠率', max: 100},
                { name: '消缺效率', max: 100},
                { name: '万元资产\n运维费用', max: 100}
            ]
        },
        series: [{
            name: 'radar',
            type: 'radar',
            // areaStyle: {normal: {}},
            data: [
                {
                    value: [74.6,79.11,	100.00,	85.21,	90.08],
                    name: '公司缺陷'
                }
            ]
        }]
    };

    chart.setOption(option);
})

function refreshChartOption(chartData){
    let data = [];

    let title = '';
    $.each(chartData,function(index,value){
        if (index === 'comp') {
            title = value;
        } else {
            data.push((value * 100).toFixed(2));
        }
    })

    let options = chart.getOption();
    options.title[0].text = title;
    options.series[0].data[0].value = data;

    chart.clear();
    setTimeout(()=>{
        chart.setOption(options);
    },300)

}