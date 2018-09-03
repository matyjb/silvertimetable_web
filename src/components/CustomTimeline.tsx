import * as React from "react";
import * as moment from "moment";

import Timeline, { TimelineGroup, TimelineItem } from "react-calendar-timeline";

// import generateFakeData from "./generate-fake-data";
import { IGlobalState } from "../store/IGlobalState";
import { connect } from "react-redux";
import { addGroup, removeLastGroup, setGroups, setItems, moveItem, resizeItem } from "../actions";

interface IProps {
    groups: TimelineGroup[];
    items: TimelineItem[];

    addGroup: any;
    removeLastGroup: any;
    setGroups: any;
    setItems: any;
    handleItemMove: any;
    handleItemResize: any;
}

interface IState {
    defaultTimeStart: Date;
    defaultTimeEnd: Date;
}

class CustomTimeline extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        const defaultTimeStart = moment()
            .startOf("day")
            .toDate();
        const defaultTimeEnd = moment()
            .startOf("day")
            .add(1, "day")
            .toDate();

        this.state = {
            //   groups,
            //   items,
            defaultTimeStart,
            defaultTimeEnd
        };
    }

    render() {
        const { defaultTimeStart, defaultTimeEnd } = this.state;
        return (
            <React.Fragment>
                <Timeline
                    groups={this.props.groups}
                    items={this.props.items}
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
                    onItemMove={this.props.handleItemMove}
                    onItemResize={this.props.handleItemResize}
                />
                <button onClick={() => this.props.addGroup("no grupka")}>dodaj</button>
                <button onClick={() => this.props.removeLastGroup()}>usun</button>
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
        addGroup: (name: string) => dispatch(addGroup(name)),
        removeLastGroup: () => dispatch(removeLastGroup()),
        setGroups: (newGroups: TimelineGroup[]) => dispatch(setGroups(newGroups)),
        setItems: (newItems: TimelineItem[]) => dispatch(setItems(newItems)),
        handleItemMove: (itemId: number, dragTime: number, newGroupOrder: number) => dispatch(moveItem(itemId, dragTime, newGroupOrder)),
        handleItemResize: (itemId: number, time: number, edge: "left" | "right") => dispatch(resizeItem(itemId, time, edge)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomTimeline);