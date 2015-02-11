var toggle = Inlet.toggle();
var metro = Inlet.metro(100);
var counter = Inlet.counter(0, 15);
var print = Inlet.print("hoge");

toggle.connect(metro);
metro.connect(counter);
counter.connect(print);

toggle.click();

setTimeout(function() {
  toggle.click();
}, 5 * 1000);
