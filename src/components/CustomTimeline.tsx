import * as moment from "moment";
import * as React from "react";

import Timeline, { TimelineGroup, TimelineItem } from "react-calendar-timeline";

interface IProps {
    groups: TimelineGroup[];
    items: TimelineItem[];
    onItemResize: any;
    onItemMove: any;
}

export default class CustomTimeline extends React.Component<IProps> {
    private myref: any;

    public onTimeChange(visibleTimeStart: any, visibleTimeEnd: any, updateScrollCanvas: any) {

        const minTime = moment().startOf("day").add(6, "hour").valueOf();
        const maxTime = moment().startOf("day").add(21, "hour").valueOf();
        if (visibleTimeStart < minTime && visibleTimeEnd > maxTime) {
            updateScrollCanvas(minTime, maxTime);
        } else if (visibleTimeStart < minTime) {
            updateScrollCanvas(minTime, minTime + (visibleTimeEnd - visibleTimeStart));
        } else if (visibleTimeEnd > maxTime) {
            updateScrollCanvas(maxTime - (visibleTimeEnd - visibleTimeStart), maxTime);
        } else {
            updateScrollCanvas(visibleTimeStart, visibleTimeEnd);
        }
    }

    public render() {
        const defaultTimeStart = moment().startOf("day").add(6, "hour").valueOf();
        const defaultTimeEnd = moment().startOf("day").add(21, "hour").valueOf();
        return (
            <Timeline
                groups={this.props.groups}
                items={this.props.items}
                sidebarContent={<div>Grupy</div>}
                minZoom={5 * 60 * 60 * 1000}
                maxZoom={24 * 60 * 60 * 1000}
                traditionalZoom={false}
                stackItems={true}
                itemHeightRatio={0.75}
                showCursorLine={true}
                canResize={"both"}
                visibleTimeStart={defaultTimeStart}
                visibleTimeEnd={defaultTimeEnd}
                ref={(ref: any) => this.myref = ref}
                onTimeChange={this.onTimeChange}
                timeSteps={{second: 15, minute: 15, hour: 1, day: 1, month: 1, year: 1}}
                onItemMove={this.props.onItemMove}
                onItemResize={this.props.onItemResize}
            />
        );
  }
}
