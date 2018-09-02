import * as moment from "moment";
import * as React from "react";

import Timeline, { TimelineGroup, TimelineItem } from "react-calendar-timeline";

interface IState {
    groups: TimelineGroup[];
    items: TimelineItem[];
}

export default class CustomTimeline extends React.Component<{}, IState> {
    private myref: any;
    constructor(props: any) {
        super(props);
        const gr: TimelineGroup[] = [];
        for (let i = 0; i < 3; i++) {
            gr.push(
                {
                    id: i + 1,
                    title: "grupa " + (i + 1),
                }
            );
        }
        // gr = this.GetGroupsPerDaysForTimeline(gr);
        const it: TimelineItem[] = [];
        for (let i = 0; i < 7; i++) {
            const time = Math.random();
            it.push(
                {
                    end_time: moment().startOf("day").add(6, "hour").add(time * i + 2, "hour").toDate(),
                    group: Math.floor(Math.random() * 7) * 100 + Math.floor(Math.random() * 3),
                    // group: Math.floor(Math.random() * 3),
                    id: i + 1,
                    start_time: moment().startOf("day").add(6, "hour").add(time * i + 1, "hour").toDate(),
                    title: "event no. " + (i + 1),
                }
            );
        }
        this.state = {
            groups: gr,
            items: it,
        };
        // this.AddGroup = this.AddGroup.bind(this);
        // this.handleItemMove = this.handleItemMove.bind(this);
        // this.handleItemResize = this.handleItemResize.bind(this);
    }

    private keys = {
        groupIdKey: "id",
        groupTitleKey: "title",
        groupRightTitleKey: "rightTitle",
        itemIdKey: "id",
        itemTitleKey: "title",    // key for item div content
        itemDivTitleKey: "title", // key for item div title (<div title="text"/>)
        itemGroupKey: "group",
        itemTimeStartKey: "start_time",
        itemTimeEndKey: "end_time"
    };

    public getGroupsPerDaysForTimeline(groups: TimelineGroup[]): TimelineGroup[] {
        const gr: TimelineGroup[] = [];
        const days: string[] = ["Pn", "Wt", "Śr", "Czw", "Pt", "So", "N"];
        days.forEach((day, dayIndex) => {
            groups.forEach((group, index) => {
                gr.push(
                    {
                        id: dayIndex * 100 + index,
                        title: day + " " + group.title,
                    }
                );
            });
        });
        return gr;
    }


    addGroup = () => {
        const t: number = this.state.groups.length;
        const gr: TimelineGroup[] = this.state.groups;
        gr.push(
            {
                id: t + 1,
                title: "grupa " + (t + 1),
            }
        );
        this.setState({ groups: gr });
    }

    handleItemMove = (itemId: number, dragTime: number, newGroupOrder: number) => {
        const { items, groups } = this.state;

        const group = groups[newGroupOrder];
        items.forEach((item) => {
            console.log(item.id); });
        this.setState({
            items: items.map(
                item => {
                    if (item !== undefined) {
                        if (item.id === itemId) {
                            return {
                                ...item,
                                start_time: dragTime,
                                end_time: dragTime + (item.end_time - item.start_time),
                                group: group.id
                            };
                        }
                    }
                    return item;
                }
            )
        });

        console.log("Moved", itemId, dragTime, newGroupOrder);
    };

    handleItemResize = (itemId: number, newResizeEnd: number, edge: "left" | "right") => {
        const { items } = this.state;

        this.setState({
            items: items.map(
                item =>
                    item.id === itemId
                        ? {
                            ...item,
                            start_time: edge === "left" ? newResizeEnd : item.start_time,
                            end_time: edge === "left" ? item.end_time : newResizeEnd
                        }
                        : item
            )
        });

        console.log("Resized", itemId, newResizeEnd, edge);
    };

    public handleTimeChange(visibleTimeStart: any, visibleTimeEnd: any, updateScrollCanvas: any) {

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
        const newGroups = this.getGroupsPerDaysForTimeline(this.state.groups);
        // const newGroups = this.state.groups;
        return (
            <React.Fragment>
                <Timeline
                    groups={newGroups}
                    // groups={this.state.groups}
                    items={this.state.items}
                    keys={this.keys}
                    sidebarContent={<div>Grupy</div>}
                    minZoom={5 * 60 * 60 * 1000}
                    maxZoom={24 * 60 * 60 * 1000}
                    traditionalZoom={false}
                    stackItems={false}
                    itemHeightRatio={0.75}
                    showCursorLine={true}
                    canResize={"both"}
                    visibleTimeStart={defaultTimeStart}
                    visibleTimeEnd={defaultTimeEnd}
                    ref={(ref: any) => this.myref = ref}
                    onTimeChange={this.handleTimeChange}
                    timeSteps={{ second: 15, minute: 15, hour: 1, day: 1, month: 1, year: 1 }}
                    onItemMove={this.handleItemMove}
                    onItemResize={this.handleItemResize}
                />
                <button onClick={this.addGroup}>Dodaj grupe</button>
            </React.Fragment>
        );
    }
}
