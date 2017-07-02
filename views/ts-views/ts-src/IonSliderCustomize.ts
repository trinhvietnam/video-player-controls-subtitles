/**
 * Created by nam on 7/2/2017.
 */
declare var $;
export class IonSliderCustomize {
    public customize(parent,backgroundColor, slideColor, height,dCircle,dataSlider,maxValue,from) {
        var _parent = parent;
        var _bg_bg = backgroundColor;
        var _bg_fill = slideColor;
        var _height_1 = height+'px';
        var _height_2 = dCircle + 'px';
        var _width_1 = _height_2;
        var _top_1 = (40 - dCircle) / 2 + 'px';
        var _top_2 = (40 - height) / 2 + 'px';
        var _top_3 = -((40 - dCircle) / 2)+ 'px';
        var _font_size_1 = 12 + (height / 10) + 'px';
        var style = `_parent .irs{
                        background:transparent;
                        cursor: pointer;
                    }
                    _parent .irs-bar-edge,_parent  .irs-bar,_parent  .irs-line,_parent  .irs-line .irs-line-left,_parent  .irs-line .irs-line-mid,_parent  .irs-line .irs-line-right{
                        height: _height_1
                    }
                    _parent .irs-bar{
                        background:_bg_fill
                    }
                    _parent .irs-line-left,_parent .irs .irs-line-mid,_parent .irs .irs-line-right{
                        background:_bg_bg
                    }
                    _parent .irs-slider.single{
                        height: _height_2;
                        width: _width_1;
                        background:_bg_fill;
                        border-radius:50%;
                        top:_top_1;
                    }
                    _parent .irs-bar-edge{
                        background:_bg_fill
                    }
                    _parent .irs-bar,_parent .irs-line,_parent .irs-bar-edge{
                        top:_top_2
                    }
                    _parent .irs-min,_parent .irs-max{
                        display: none
                    }
                    _parent .irs-single{
                        top: _top_3;
                        font-size:_font_size_1;
                    }`;
        var result = style.replace(/_bg_bg/g,_bg_bg )
            .replace(/_bg_fill/g,_bg_fill )
            .replace(/_height_1/g,_height_1 )
            .replace(/_height_2/g,_height_2 )
            .replace(/_width_1/g,_width_1 )
            .replace(/_top_1/g,_top_1 )
            .replace(/_top_2/g,_top_2 )
            .replace(/_top_3/g,_top_3 )
            .replace(/_font_size_1/g,_font_size_1 )
            .replace(/_parent/g,_parent );
        console.log(result);
        $('head').append($('<style>'+result+'</style>'));
        $(parent).on('click',' >.irs',function(e){
            var elm = $(this);
            var xPos = e.pageX - elm.offset().left;
            var max = $(this).width();
            var update = Math.round(xPos * maxValue / max);
            dataSlider.update({
                from: update,
            });
        });
        dataSlider.update({
            from:from
        })
    }
}
