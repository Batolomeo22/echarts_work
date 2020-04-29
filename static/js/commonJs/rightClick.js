var style_ul = "padding:0px;margin:0px;border: 1px solid #ccc;background-color: #fff;position: absolute;left: 0px;top: 0px;z-index: 2;display: none;";
var style_li = "list-style:none;padding: 5px; cursor: pointer; padding: 5px 20px;margin:0px;";
var style_li_hover = style_li + "background-color: #00A0E9; color: #fff;";
var markLineDefault = {
    symbol : 'none',
    itemStyle : {
      normal : {
        color:'#1e90ff',
        label : {
          show:true
        }
      }
    },
    data : [{type : 'average', name: '平均值'}],
    animation: true
};

function createMenuBox(id,myChart){
    let menuBox = $("<div id="+id+" class='echartboxMenu' style='" + style_ul + "'><div style='text-align:center;background:#ccc'></div><ul style='margin:0px;padding:0px;'></ul></div>")
    .appendTo($(document.body));

    //移除浏览器右键菜单
    myChart.getDom().oncontextmenu  = menuBox[0].oncontextmenu = function(){
        return false;
    }

    //点击其他位置隐藏菜单
    $(document).click(function() {
        menuBox.hide()        
    });
    return menuBox;
}
 

//显示菜单
var showMenu = function(e,menus,menubox){
    $("div", menubox).text('功能：');
    var menulistbox = $("ul", menubox).empty();
    $(menus).each(function(i, item) {
        var li = $("<li style='" + style_li + "'>" + item.name + "</li>")
            .mouseenter(function() {
                $(this).attr("style", style_li_hover);
            })
            .mouseleave(function() {
                $(this).attr("style", style_li);
            })
            .click(function() {
                item["fn"].call(this);
                menubox.hide();
            });
        menulistbox.append(li);
    });
    menubox.css({
        "left": event.x,
        "top": event.y
    }).show();
}