toggle  = Inlet.toggle()
metro   = Inlet.metro(100)
counter = Inlet.counter(0, 15)
print   = Inlet.print("hoge")

toggle[0].connect metro[0]
metro[0].connect counter[0]
counter[0].connect print[0]

do toggle.click

setTimeout ->
  do toggle.click
, 5 * 1000
