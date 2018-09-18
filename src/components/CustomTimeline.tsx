import * as React from "react";
import * as moment from "moment";

import Timeline, { TimelineGroup, TimelineItem } from "react-calendar-timeline";

// import generateFakeData from "./generate-fake-data";
import { IGlobalState } from "../store/IGlobalState";
import { connect } from "react-redux";
import * as actions from "../actions";
import generateFakeData from "./generate-fake-data";

const keys = {
    groupIdKey: "id",
    groupTitleKey: "title",
    groupRightTitleKey: "rightTitle",
    itemIdKey: "id",
    itemTitleKey: "title",
    itemDivTitleKey: "title",
    itemGroupKey: "group",
    itemTimeStartKey: "start_time",
    itemTimeEndKey: "end_time"
  };

interface IProps {
    groups: TimelineGroup[];
    items: TimelineItem[];
    selected_items: number[];

    addGroup: any;
    removeLastGroup: any;
    removeGroup: any;
    clearGroups: any;
    setGroups: any;
    setItems: any;
    handleItemMove: any;
    handleItemResize: any;
    selectItem: any;
    deselectItem: any;
    clearSelected: any;
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
                    selected={this.props.selected_items}
                    keys={keys}
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
                    onItemSelect={this.props.selectItem}
                    onCanvasClick={this.props.clearSelected}
                />
                <button onClick={() => this.props.addGroup()}>dodaj</button>
                <button onClick={this.props.removeLastGroup}>usun</button>
                <button onClick={() => this.props.removeGroup(1)}>usun o id 1</button>
                <button onClick={this.props.clearGroups}>usun wszystkie</button>
                <button onClick={() => {
                    const {groups, items} = generateFakeData();
                    this.props.setGroups(groups);
                    this.props.setItems(items);
                }}>wygeneruj</button>
            </React.Fragment>
        );
    }
}
const mapStateToProps = (state: IGlobalState) => {
    return {
        groups: state.groups,
        items: state.items,
        selected_items: state.selected_items,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        addGroup: (name: string) => dispatch(actions.addGroup(name)),
        removeLastGroup: () => dispatch(actions.removeLastGroup()),
        setGroups: (newGroups: TimelineGroup[]) => dispatch(actions.setGroups(newGroups)),
        setItems: (newItems: TimelineItem[]) => dispatch(actions.setItems(newItems)),
        handleItemMove: (itemId: number, dragTime: number, newGroupOrder: number) => dispatch(actions.moveItem(itemId, dragTime, newGroupOrder)),
        handleItemResize: (itemId: number, time: number, edge: "left" | "right") => dispatch(actions.resizeItem(itemId, time, edge)),
        removeGroup: (groupId: number) => dispatch(actions.removeGroup(groupId)),
        clearGroups: () => dispatch(actions.clearGroups()),
        selectItem: (itemId: number) => dispatch(actions.selectItem(itemId)),
        deselectItem: (itemId: number) => dispatch(actions.deselectItem(itemId)),
        clearSelected: () => dispatch(actions.clearSelected()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomTimeline);