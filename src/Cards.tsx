import { Button, IconButton } from "@mui/material";
import React, { Component } from "react";
import { Container, Draggable } from "react-smooth-dnd";
import { IWebservice, ITasksContainer } from "./Interfaces";
import { applyDrag, generateItems } from "./Utils";
import AddIcon from '@mui/icons-material/Add';
import { ConstructionOutlined } from "@mui/icons-material";

const lorem = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;

var columnNames = ["Lorem", "Ipsum", "Consectetur", "Eiusmod"];

const cardColors = [
    "azure",
    "beige",
    "bisque",
    "blanchedalmond",
    "burlywood",
    "cornsilk",
    "gainsboro",
    "ghostwhite",
    "ivory",
    "khaki"
];
const pickColor = () => {
    let rand = Math.floor(Math.random() * 10);
    return cardColors[rand];
};

export interface Props {
    oWebservice?: IWebservice
}
export interface State {
    scene: {
        type: string,
        props: {
            orientation: string
        },
        children: any
    }
}

class Cards extends React.Component<Props, State> {
    constructor(p_oPros: Props) {

        super(p_oPros);

        this.onColumnDrop = this.onColumnDrop.bind(this);
        this.onCardDrop = this.onCardDrop.bind(this);
        this.getCardPayload = this.getCardPayload.bind(this);

        // const oModel: Array<ITasksContainer> = p_oPros.oWebservice?.fGetLists();



        this.state = {
            scene: {
                type: "container",
                props: {
                    orientation: "horizontal"
                },
                children: p_oPros.oWebservice?.fGetLists()
            }
        };
    }

    render() {
        return (
            <div className="card-scene">
                <Container
                    orientation="horizontal"
                    onDrop={this.onColumnDrop}
                    dropPlaceholder={{
                        animationDuration: 150,
                        showOnTop: true,
                        className: 'cards-drop-preview'
                    }}
                >
                    {this.state.scene.children.map((column: any): any => {
                        return (
                            <Draggable key={column.id}>
                                <div className={column.props.className}>
                                    <div className="card-column-header">

                                        {column.name}
                                    </div>
                                    <Container
                                        {...column.props}
                                        groupName="col"
                                        onDragStart={e => console.log("drag started", e)}
                                        onDragEnd={e => console.log("drag end", e)}
                                        onDrop={e => this.onCardDrop(column.id, e)}
                                        getChildPayload={index =>
                                            this.getCardPayload(column.id, index)
                                        }
                                        dragClass="card-ghost"
                                        dropClass="card-ghost-drop"
                                        onDragEnter={() => {
                                            console.log("drag enter:", column.id);
                                        }}
                                        onDragLeave={() => {
                                            console.log("drag leave:", column.id);
                                        }}
                                        onDropReady={p => console.log('Drop ready: ', p)}
                                        dropPlaceholder={{
                                            animationDuration: 150,
                                            showOnTop: true,
                                            className: 'drop-preview'
                                        }}
                                        dropPlaceholderAnimationDuration={200}
                                    >
                                        {column.children.map((card: any): any => {
                                            return (
                                                <Draggable key={card.id}>
                                                    <div {...card.props}>
                                                        <p>{card.data}</p>
                                                    </div>
                                                </Draggable>
                                            );
                                        })}
                                    </Container>
                                    <div className="ContainerFooter">
                                        <IconButton aria-label="delete" onClick={() => {

                                            const scene = Object.assign({}, this.state.scene);
                                            column.fAddTask();
                                            this.setState({ scene });
                                        }} >
                                            <AddIcon />
                                        </IconButton>
                                    </div>
                                </div>
                            </Draggable>
                        );
                    })}
                </Container>
            </div>
        );
    }

    getCardPayload(columnId: any, index: any) {
        return this.state.scene.children.filter((p: any): any => p.id === columnId)[0].children[
            index
        ];
    }

    onColumnDrop(dropResult: any) {
        const scene = Object.assign({}, this.state.scene);
        scene.children = applyDrag(scene.children, dropResult);
        this.setState({
            scene
        });
    }

    onCardDrop(columnId: any, dropResult: any) {
        const scene = Object.assign({}, this.state.scene);
        const draggedTask = dropResult.payload;
        const oParent: ITasksContainer = scene.children.filter((p: any): any => p.id === columnId)[0];
        if (dropResult.removedIndex !== null) {

            oParent.fRemoveTask(draggedTask);
        }
        if (dropResult.addedIndex !== null) {

            oParent.fAddTask(draggedTask);
        }
        this.setState({ scene });
    }
}

export default Cards;