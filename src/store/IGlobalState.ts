import { TimelineGroup, TimelineItem } from "react-calendar-timeline";

export interface IGlobalState {
    groups: TimelineGroup[];
    items: TimelineItem[];
    selected_items: number[];
}