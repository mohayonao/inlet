var toggle  = Inlet.toggle();
var metro   = Inlet.metro(100);
var counter = Inlet.counter(0, 15);
var print   = Inlet.print("hoge");

toggle [0].connect(metro  [0]);
metro  [0].connect(counter[0]);
counter[0].connect(print  [0]);

toggle.click();

setTimeout(function() {
  toggle.click();
}, 5 * 1000);
