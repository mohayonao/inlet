var toggle  = inlet("toggle", { x: 10, y: 10 });
var metro   = inlet("metro 100", { x: 10, y: 40 });
var counter = inlet("counter 0 15", { x: 10, y: 70 });
var print   = inlet("print hoge", { x: 10, y: 100 });

toggle [0].connect(metro  [0]);
metro  [0].connect(counter[0]);
counter[0].connect(print  [0]);
