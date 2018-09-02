import * as faker from "faker";
// import * as randomColor from "randomcolor";
import * as moment from "moment";
import { TimelineItem } from "react-calendar-timeline";

export default function(groupCount = 30, itemCount = 100, daysInPast = 30) {
  // const randomSeed = Math.floor(Math.random() * 1000);
  const groups = [];
  for (let i = 0; i < groupCount; i++) {
    groups.push({
      id: i + 1,
      title: faker.name.firstName(),
      rightTitle: faker.name.lastName(),
      // bgColor: randomColor({ luminosity: "light", seed: randomSeed + i })
    });
  }

  let items: TimelineItem[] = [];
  for (let i = 0; i < itemCount; i++) {
    const startDate =
      faker.date.recent(daysInPast).valueOf() + daysInPast * 0.3 * 86400 * 1000;
    // const startValue =
    //   Math.floor(moment(startDate).valueOf() / 10000000) * 10000000;
    // const endValue = moment(
    //   startDate + faker.random.number({ min: 2, max: 20 }) * 15 * 60 * 1000
    // ).valueOf();
    const startValue: Date = moment().add(faker.random.number({ min: 1, max: 5 }), "hour").toDate();
    const endValue: Date = moment(startValue).add(faker.random.number({ min: 1, max: 5 }), "hour").toDate();


    items.push({
      id: i,
      group: faker.random.number({ min: 1, max: groups.length }),
      title: faker.hacker.phrase(),
      start_time: startValue,
      end_time: endValue,
      // canMove: startValue > new Date().getTime(),
      // canResize: 'both',
      className:
        moment(startDate).day() === 6 || moment(startDate).day() === 0
          ? "item-weekend"
          : "",
      itemProps: {
        "data-tip": faker.hacker.phrase()
      }
    });
  }

  items = items.sort((a) => a.id);

  return { groups, items };
}
