var toggle  = inlet("toggle");
var metro   = inlet("metro 100");
var counter = inlet("counter 0 15");
var print   = inlet("print hoge");

toggle [0].connect(metro  [0]);
metro  [0].connect(counter[0]);
counter[0].connect(print  [0]);
