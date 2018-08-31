import * as moment from "moment";
import * as React from "react";

import Timeline, { TimelineGroup, TimelineItem } from "react-calendar-timeline";
import { IGlobalState } from "../store/IGlobalState";
import { addGroup, moveItem, resizeItem } from "../actions";
import { connect } from "react-redux";

interface IProps {
    groups: TimelineGroup[];
    items: TimelineItem[];
    onItemMove: any;
    onItemResize: any;
    addGroup: any;
}

interface IState {
    groups: TimelineGroup[];
}

class CustomTimeline extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        // const grit = this.generateFakeGroupsAndItems();
        // this.state = {
        //     groups: grit.gr,
        //     items: grit.it,
        // };
        // this.onItemMove = this.onItemMove.bind(this);
        // this.onItemResize = this.onItemResize.bind(this);
        // this.addGroup = this.addGroup.bind(this);
        this.state = {
            groups: [],
        };
    }

    public generateFakeGroupsAndItems(): any {
        // generating test groups
        const gr: TimelineGroup[] = [];
        for (let i = 0; i < 3; i++) {
            gr.push(
                {
                    id: i + 1,
                    title: "grupa " + (i + 1),
                }
            );
        }

        // generating test groups
        const it: TimelineItem[] = [];
        for (let i = 0; i < 7; i++) {
            const time = Math.random();
            it.push(
                {
                    canChangeGroup: true,
                    canMove: true,
                    canResize: "both",
                    end_time: moment().startOf("day").add(6, "hour").add(time * i + 2, "hour").toDate(),
                    group: Math.floor(Math.random() * 7) * 100 + Math.floor(Math.random() * 3),
                    id: i + 1,
                    start_time: moment().startOf("day").add(6, "hour").add(time * i + 1, "hour").toDate(),
                    title: "event no. " + (i + 1),
                }
            );
        }

        return { gr, it };
    }

    public getGroupsPerDayForTimeline(groups: TimelineGroup[]): TimelineGroup[] {
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

    // public onItemMove(itemId: number, dragTime: number, newGroupOrder: number): any {
    //     const items = this.state.items;
    //     const item: TimelineItem | undefined = items.find(i => i.id === itemId);
    //     let newItem: any;
    //     if (item !== undefined) {
    //         const moveDiff = dragTime - moment(item.start_time).valueOf();
    //         const newStartTime = moment(item.start_time).valueOf() + moveDiff;
    //         const newEndTime = moment(item.end_time).valueOf() + moveDiff;
    //         newItem = { ...item, group: this.getGroupsPerDayForTimeline(this.state.groups)[newGroupOrder].id, start_time: moment(newStartTime).toDate(), end_time: moment(newEndTime).toDate() };

    //         const newItems: TimelineItem[] = [];
    //         items.forEach(item => {
    //             if (item.id !== itemId) {
    //                 newItems.push(item);
    //             } else {
    //                 newItems.push(newItem);
    //             }
    //         });
    //         this.setState({ items: newItems });
    //     }
    // }
    // public onItemResize(itemId: number, newResizeEnd: number, edge: "left" | "right"): any {
    //     const items = this.state.items;
    //     const item: TimelineItem | undefined = items.find(i => i.id === itemId);
    //     let newItem: any;
    //     if (item !== undefined) {
    //         if (edge === "left") {
    //             const newStartTime = moment(newResizeEnd).valueOf();
    //             newItem = { ...item, start_time: moment(newStartTime).toDate() };
    //         } else if (edge === "right") {
    //             const newEndTime = moment(newResizeEnd).valueOf();
    //             newItem = { ...item, end_time: moment(newEndTime).toDate() };
    //         }

    //         const newItems: TimelineItem[] = [];
    //         items.forEach(item => {
    //             if (item.id !== itemId) {
    //                 newItems.push(item);
    //             } else {
    //                 newItems.push(newItem);
    //             }
    //         });
    //         this.setState({ items: newItems });
    //     }
    // }

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
            <React.Fragment>
                <Timeline
                    groups={this.props.groups}
                    items={this.props.items}
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
                    onTimeChange={this.onTimeChange}
                    timeSteps={{ second: 15, minute: 15, hour: 1, day: 1, month: 1, year: 1 }}
                    onItemMove={this.props.onItemMove}
                    onItemResize={this.props.onItemResize}
                />
                <button onClick={this.props.addGroup}>Dodaj grupe</button>
            </React.Fragment>
        );
    }
}
const mapStateToProps = (state: IGlobalState) => {
    return {
        groups: state.groups,
        items: state.items,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        addGroup: () => dispatch(addGroup()),
        onItemMove: () => dispatch(moveItem()),
        onItemResize: () => dispatch(resizeItem()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomTimeline);
