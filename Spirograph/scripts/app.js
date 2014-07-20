/// <reference path='definitions/references.d.ts' />
'use strict';
var Spirograph;
(function (Spirograph) {
    var svgContainer = d3.select("body").append("svg").attr("width", window.innerWidth).attr("height", window.innerHeight);

    var gearOptions = {
        radius: 64,
        toothCount: 32,
        toothHeight: 10,
        holeCount: 9,
        holeSweepAngle: 540,
        holePositionBuffer: 8
    };

    //var gearOptions: Shapes.GearOptions = {
    //    radius: 120,
    //    toothCount: 60,
    //    toothHeight: 10,
    //    holeCount: 23,
    //    holeSweepAngle: 720,
    //    holePositionBuffer: 15
    //};
    //var gearOptions: Shapes.GearOptions = {
    //    radius: 168,
    //    toothCount: 84,
    //    toothHeight: 10,
    //    holeCount: 35,
    //    holeSweepAngle: 900,
    //    holePositionBuffer: 15
    //};
    //var gearOptions: Shapes.GearOptions = {
    //    radius: 48,
    //    toothCount: 24,
    //    toothHeight: 10,
    //    holeCount: 5,
    //    holeSweepAngle: 520,
    //    holePositionBuffer: 8
    //};
    var ringGearOptions = {
        innerRadius: 192,
        innerToothCount: 96,
        innerToothHeight: 10,
        outerRadius: 288,
        outerToothCount: 144,
        outerToothHeight: 10
    };

    var ringGear = svgContainer.append("g").attr("class", "gear ring-gear").attr("transform", "translate(" + Spirograph.Utility.getCenterX() + "," + Spirograph.Utility.getCenterY() + ")").datum(ringGearOptions).append("path").attr("d", Spirograph.Shapes.RingGear);

    var gear = svgContainer.append("g").attr("class", "gear").datum(gearOptions).append("path").attr("d", Spirograph.Shapes.Gear);

    var svgContainerMouseMove = function (d, i) {
        var mouseCoords = Spirograph.Utility.toStandardCoords({ x: d3.event.clientX, y: d3.event.clientY }, { x: window.innerWidth, y: window.innerHeight });
        var radius = ringGearOptions.innerRadius - gearOptions.radius - 2;
        var mouseAngle = Math.atan2(mouseCoords.y, mouseCoords.x);

        var newX = radius * Math.cos(mouseAngle) + Spirograph.Utility.getCenterX();
        var newY = -1 * radius * Math.sin(mouseAngle) + Spirograph.Utility.getCenterY();

        var gearRotation = 360 * (((Spirograph.Utility.toDegrees(mouseAngle) / 360) * 2 * Math.PI * ringGearOptions.innerRadius) / (2 * Math.PI * gearOptions.radius));
        gearRotation -= Spirograph.Utility.toDegrees(mouseAngle);

        $('#output').html('<p>Mouse angle: ' + Spirograph.Utility.toDegrees(mouseAngle) + '</p><p>Gear angle: ' + gearRotation + '</p>');

        gear.attr("transform", "translate(" + newX + "," + newY + ") rotate(" + gearRotation + ")");
        //gear.attr("transform", "rotate(" + Utility.toDegrees(-1 * mouseAngle) + ")");
    };

    gear.on("mousedown", function (d, i) {
        svgContainer.on("mousemove", svgContainerMouseMove);
        svgContainer.on("mouseup", function () {
            svgContainer.on("mousemove", null);
        });
    });

    gear.attr("transform", "translate(" + (ringGearOptions.innerRadius - gearOptions.radius - 2 + Spirograph.Utility.getCenterX()) + "," + Spirograph.Utility.getCenterY() + ") rotate(" + 0 + ")");
})(Spirograph || (Spirograph = {}));
//# sourceMappingURL=app.js.map
