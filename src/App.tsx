import * as React from "react";
import "react-calendar-timeline/lib/Timeline.css";
import "./App.css";
import CustomTimeline from "./components/CustomTimeline";

import * as moment from "moment";
import { TimelineGroup, TimelineItem } from "react-calendar-timeline";
import logo from "./logo.svg";

interface IState {
  groups: TimelineGroup[];
  items: TimelineItem[];
}

class App extends React.Component<{}, IState> {
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
    this.state = {
      groups: gr,
      items: it,
    };

    this.AddGroup = this.AddGroup.bind(this);
    this.onItemMove = this.onItemMove.bind(this);
    this.onItemResize = this.onItemResize.bind(this);
  }

  public onItemMove(itemId: number, dragTime: number, newGroupOrder: number): any {
    const items = this.state.items;
    const item: TimelineItem | undefined = items.find(i => i.id === itemId);
    let newItem: any;
    if (item !== undefined) {
      const moveDiff = dragTime - moment(item.start_time).valueOf();
      const newStartTime = moment(item.start_time).valueOf() + moveDiff;
      const newEndTime = moment(item.end_time).valueOf() + moveDiff;
      newItem = {...item, group: this.GetGroupsPerDaysForTimeline(this.state.groups)[newGroupOrder].id, start_time: moment(newStartTime).toDate(), end_time: moment(newEndTime).toDate()};

      const newItems: TimelineItem[] = [];
      items.forEach(item => {
        if (item.id !== itemId) {
          newItems.push(item);
        } else {
          newItems.push(newItem);
        }
      });
      this.setState({items: newItems});
    }
  }
  public onItemResize(itemId: number, newResizeEnd: number, edge: "left" | "right"): any {
    const items = this.state.items;
    const item: TimelineItem | undefined = items.find(i => i.id === itemId);
    let newItem: any;
    if (item !== undefined) {
      if (edge === "left") {
        const newStartTime = moment(newResizeEnd).valueOf();
        newItem = {...item, start_time: moment(newStartTime).toDate()};
      } else if (edge === "right") {
        const newEndTime = moment(newResizeEnd).valueOf();
        newItem = {...item, end_time: moment(newEndTime).toDate()};
      }

      const newItems: TimelineItem[] = [];
      items.forEach(item => {
        if (item.id !== itemId) {
          newItems.push(item);
        } else {
          newItems.push(newItem);
        }
      });
      this.setState({items: newItems});
    }
  }

  public GetGroupsPerDaysForTimeline(groups: TimelineGroup[]): TimelineGroup[] {
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

  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">testing timeline</h1>
        </header>
        <CustomTimeline groups={this.GetGroupsPerDaysForTimeline(this.state.groups)} items={this.state.items} onItemMove={this.onItemMove} onItemResize={this.onItemResize}/>
        <button onClick={this.AddGroup}>Dodaj grupe</button>
      </div>
    );
  }

  private AddGroup(): void {
    const t: number = this.state.groups.length;
    const gr: TimelineGroup[] = this.state.groups;
    gr.push(
      {
        id: t + 1,
        title: "grupa " + (t + 1),
      }
    );
    this.setState({groups: gr});
  }
}

export default App;
