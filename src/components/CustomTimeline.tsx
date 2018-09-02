import * as React from "react";
import * as moment from "moment";

import Timeline, { TimelineGroup, TimelineItem } from "react-calendar-timeline";

import generateFakeData from "./generate-fake-data";

interface IState {
    groups: TimelineGroup[];
    items: TimelineItem[];
    defaultTimeStart: Date;
    defaultTimeEnd: Date;
}

export default class CustomTimeline extends React.Component<{}, IState> {
  constructor(props: any) {
    super(props);

    const { groups, items } = generateFakeData();
    const defaultTimeStart = moment()
      .startOf("day")
      .toDate();
    const defaultTimeEnd = moment()
      .startOf("day")
      .add(1, "day")
      .toDate();

    this.state = {
      groups,
      items,
      defaultTimeStart,
      defaultTimeEnd
    };
  }

  handleItemMove = (itemId: number, dragTime: number, newGroupOrder: number) => {
    const { items, groups } = this.state;

    const group = groups[newGroupOrder];

    this.setState({
      items: items.map(
        item =>
          item.id === itemId
            ? {...item,
                start_time: dragTime,
                end_time: dragTime + (item.end_time - item.start_time),
                group: group.id}
            : item
      )
    });

    console.log("Moved", itemId, dragTime, newGroupOrder);
  };

  handleItemResize = (itemId: number, time: number, edge: "left" | "right") => {
    const { items } = this.state;

    this.setState({
      items: items.map(
        item =>
          item.id === itemId
            ? {...item,
                start_time: edge === "left" ? time : item.start_time,
                end_time: edge === "left" ? item.end_time : time}
            : item
      )
    });

    console.log("Resized", itemId, time, edge);
  };

  render() {
    const { groups, items, defaultTimeStart, defaultTimeEnd } = this.state;
    return (
      <Timeline
        groups={groups}
        items={items}
        // keys={keys}
        sidebarContent={<div>Above The Left</div>}
        itemTouchSendsClick={false}
        stackItems
        itemHeightRatio={0.75}
        showCursorLine
        canMove={true}
        canResize={"both"}
        defaultTimeStart={defaultTimeStart}
        defaultTimeEnd={defaultTimeEnd}
        onItemMove={this.handleItemMove}
        onItemResize={this.handleItemResize}
      />
    );
  }
}
