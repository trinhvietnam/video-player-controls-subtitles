"use strict";
exports.__esModule = true;
var IonSliderCustomer = (function () {
    function IonSliderCustomer() {
    }
    IonSliderCustomer.prototype.customize = function (parent, backgroundColor, slideColor, height, dCircle, eSlider, dataSlider, maxValue) {
        var _parent = parent;
        var _bg_bg = backgroundColor;
        var _bg_fill = slideColor;
        var _height_1 = height + 'px';
        var _height_2 = dCircle + 'px';
        var _width_1 = _height_2;
        var _top_1 = (40 - dCircle) / 2 + 'px';
        var _top_2 = (40 - height) / 2 + 'px';
        var _top_3 = -((40 - dCircle) / 2) + 'px';
        var _font_size_1 = 12 + (height / 10) + 'px';
        var style = "_parent .irs{\n                        background:transparent;\n                        cursor: pointer;\n                    }\n                    _parent .irs-bar-edge,_parent  .irs-bar,_parent  .irs-line,_parent  .irs-line .irs-line-left,_parent  .irs-line .irs-line-mid,_parent  .irs-line .irs-line-right{\n                        height: _height_1\n                    }\n                    _parent .irs-bar{\n                        background:_bg_bg\n                    }\n                    _parent .irs-line-left,_parent .irs .irs-line-mid,_parent .irs .irs-line-right{\n                        background:_bg_fill\n                    }\n                    _parent .irs-slider.single{\n                        height: _height_2;\n                        width: _width_1;\n                        background:_bg_fill;\n                        border-radius:50%;\n                        top:_top_1;\n                    }\n                    _parent .irs-bar-edge{\n                        background:_bg_bg\n                    }\n                    _parent .irs-bar,_parent .irs-line,_parent .irs-bar-edge{\n                        top:_top_2\n                    }\n                    _parent .irs-min,_parent .irs-max{\n                        display: none\n                    }\n                    _parent .irs-single{\n                        top: _top_3;\n                        font-size:_font_size_1;\n                    }";
        var result = style.replace(/_bg_bg/g, _bg_bg)
            .replace(/_bg_fill/g, _bg_fill)
            .replace(/_height_1/g, _height_1)
            .replace(/_height_2/g, _height_2)
            .replace(/_width_1/g, _width_1)
            .replace(/_top_1/g, _top_1)
            .replace(/_top_2/g, _top_2)
            .replace(/_top_3/g, _top_3)
            .replace(/_font_size_1/g, _font_size_1)
            .replace(/_parent/g, _parent);
        console.log(result);
        $('head').append($('<style>' + result + '</style>'));
        $(parent).on('click', ' >.irs', function (e) {
            var elm = $(this);
            var xPos = e.pageX - elm.offset().left;
            var max = $(this).width();
            var update = Math.floor(xPos * maxValue / max);
            dataSlider.update({
                from: update
            });
        });
    };
    return IonSliderCustomer;
}());
exports.IonSliderCustomer = IonSliderCustomer;
var ionSliderCustomer = new IonSliderCustomer();
