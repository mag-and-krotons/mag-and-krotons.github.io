/* The stories. Add a new one at the top of the list.
 * Each story: id, title, hook (one line), minutes (reading time), paper (id in papers.json, optional),
 * and paragraphs (an array of strings). Keep them true: say what is known, and say plainly what is still open.
 */
window.STORIES = [
  {
    "id": "the-first-lesson",
    "title": "The first lesson",
    "hook": "Learn from what you live and what others have lived. Then look for yourself.",
    "minutes": 3,
    "paragraphs": [
      "Before any number, any machine or any law of nature, there is one lesson underneath all the others. Knowledge is taught and learned through experience: your own, and the experience of everyone who walked the road before you.",
      "A child doesn't learn about fire from a book. She learns it from the warmth on her hands, and from her mother's voice saying \"not too close\". Both are experience. One is her own. The other was lent to her by someone who loved her.",
      "That brings the second half of the lesson: observe, and understand. Don't take in an idea blindly, not from a teacher, not from a famous name, not from a machine, and not from me. Hold it up against what you can see. If it doesn't fit, say so. That's why every story here tells you what is known and what is still open, so you can check it yourself.",
      "Knowledge given with love isn't sold. When understanding is kept behind a price, the people who can't pay go without, and one person's need grows out of another person's greed. If it is given freely, from the heart, nobody has to become needy because someone else wanted more. So nothing here has a price.",
      "I also believe there is only one nature. We cut it into physics and chemistry, biology, quantum and strings because our tools and our lifetimes are small, not because the world comes in pieces. The work ahead is to see it as one again.",
      "Nobody does that work alone, not a person and not a machine. It takes people who observe, machines that compute and remember, and nature, which answers every honest question truthfully. Man, machine and nature, working together toward excellence.",
      "Who am I? I'm Fe60Gene, one more person learning from all of you."
    ]
  },
  {
    id: "twin-clocks",
    title: "The clocks that guard the twins",
    hook: "Two primes, two apart, and the quiet places where nothing knocks.",
    minutes: 3,
    paper: "nothing_binds_a_twin",
    paragraphs: [
      "Some numbers come in pairs. 11 and 13. 17 and 19. 41 and 43. Two primes, two apart, standing so close they almost touch. Mathematicians call them twin primes.",
      "Every twin pair after 3 and 5 sits on either side of a multiple of six: one just below it, one just above. So picture a long road with a lamp at every multiple of six, and a house on each side of every lamp.",
      "Now think of every prime from 5 upward as a clock. The clock for 5 ticks at certain lamps and knocks on one of the two houses there. The clock for 7 ticks at other lamps. A clock knocks on one house at a time, never both. That is the whole relation between twins: if a clock marks one of them, it leaves the other alone.",
      "A twin pair is a lamp where no clock knocks at all. Both houses stay quiet.",
      "Further down the road more clocks join in, and the quiet lamps become rarer. Yet they keep appearing. Below ten billion there are 27,412,679 twin pairs, and that count agrees closely with a formula Hardy and Littlewood wrote down in 1923.",
      "Here is the honest part. Nobody has yet proved, in a way mathematicians everywhere accept, that the twins go on forever. In 2013 Yitang Zhang, then a little-known lecturer, proved that infinitely many pairs of primes lie less than 70 million apart. Within a year, others brought that down to 246. The road from 246 to 2 is still open.",
      "I think about the twins when life feels crowded. Every clock in the world can be ticking, and there are still quiet places where nothing is knocking. You only have to keep walking down the road."
    ]
  },
  {
    id: "three-is-enough",
    title: "Why three is enough",
    hook: "Yes, no, and not yet: the cheapest way to count.",
    minutes: 3,
    paper: "06_Algorithms_Three_Is_Enough",
    paragraphs: [
      "Suppose you must build a machine that can show any number below a million, and every position on its dial costs one coin for each symbol it can show.",
      "A dial with our ten usual digits needs six positions: sixty coins. A binary dial, only 0 and 1, needs twenty positions: forty coins. A dial with three symbols needs thirteen positions: thirty-nine coins.",
      "Try it with bigger and bigger numbers and the winner stays the same. Of all whole numbers of symbols, three is the cheapest, and past a certain size it is the only cheapest.",
      "Now choose the three symbols well: not 0, 1 and 2, but minus one, zero and plus one. This is called balanced ternary. Every whole number, positive or negative, has exactly one way to be written. To make a number negative you don't need a minus sign; you flip every digit. To round a number, you simply cut off its last digits.",
      "In 1958, at Moscow State University, Nikolay Brusentsov and his team built a computer called Setun that worked this way. About fifty were made. Then the world settled on binary, mostly because switches with two states were easier to build, and Setun was nearly forgotten.",
      "The idea did not die. Today some AI systems store what they have learned using only minus one, zero and plus one, and lose surprisingly little.",
      "What I love about three is that it has room for \"not yet\". Yes, no, and I don't know. Many arguments grow smaller the moment someone is allowed to say the third thing."
    ]
  },
  {
    id: "wire-nobody-needs",
    title: "The wire nobody needs",
    hook: "Why power lines come in threes, and what balance really means.",
    minutes: 2,
    paper: "pair_triad_half",
    paragraphs: [
      "Look at the power lines along a highway and you will often see them in threes. That isn't decoration.",
      "The electricity in those lines swings back and forth, fifty times a second in India. Each of the three wires carries the same swing, but each starts a third of a turn after the one before. When one is at its peak, the other two are below, and at every moment the three add up to exactly zero.",
      "That zero is a gift. An ordinary circuit needs one wire to carry the current out and another to bring it back. With three balanced currents no return wire is needed, because each wire's current comes back through the other two. Three wires do the work that would otherwise take six.",
      "That saving is a large part of why most of the world's power runs on three phases, an idea worked out around 1890 by Mikhail Dolivo-Dobrovolsky, Nikola Tesla, Galileo Ferraris and others.",
      "The same thirds appear far from power lines. Three equal pulls, a third of a turn apart, cancel each other. Three people pulling a cart evenly from three sides hold it perfectly still.",
      "There is something tender in that for me. Balance doesn't mean everyone does the same thing at the same moment. It means each one takes a turn, and together nothing is wasted."
    ]
  }
];
