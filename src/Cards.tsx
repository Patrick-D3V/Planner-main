import { Button, Chip, IconButton, TextField } from "@mui/material";
import React, { Component } from "react";
import { Container, Draggable } from "react-smooth-dnd";
import { IWebservice, ITasksContainer, eSaveType } from "./Interfaces";
import { applyDrag, generateItems } from "./Utils";
import { Add, TagFaces, ConstructionOutlined } from '@mui/icons-material';

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

    public fSetState(p_oState: any, p_fCallback: any = () => { }) {

        this.setState(p_oState, p_fCallback);
        if (this.props.oWebservice?.saveType === eSaveType.Complete) {

            this.props.oWebservice.fSave(this.state.scene.children);
        }
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
                                        // onDragStart={e => console.log("drag started", e)}
                                        // onDragEnd={e => console.log("drag end", e)}
                                        onDrop={e => this.onCardDrop(column.id, e)}
                                        getChildPayload={index =>
                                            this.getCardPayload(column.id, index)
                                        }
                                        dragClass="card-ghost"
                                        dropClass="card-ghost-drop"
                                        // onDragEnter={() => {
                                        //     console.log("drag enter:", column.id);
                                        // }}
                                        // onDragLeave={() => {
                                        //     console.log("drag leave:", column.id);
                                        // }}
                                        // onDropReady={p => console.log('Drop ready: ', p)}
                                        dropPlaceholder={{
                                            animationDuration: 150,
                                            showOnTop: true,
                                            className: 'drop-preview'
                                        }}
                                        dropPlaceholderAnimationDuration={200}
                                        style={{ maxHeight: "80vh", overflowY: "auto" }}
                                    >
                                        {column.children.map((card: any): any => {
                                            return (
                                                <Draggable key={card.id}>
                                                    <div id={"t" + card.id} {...card.props}>
                                                        {/* <p>{card.parentId}</p> */}
                                                        <div>
                                                            <Chip label="Planner" color="info" size="small" icon={<TagFaces />} />
                                                        </div>
                                                        <TextField
                                                            multiline
                                                            fullWidth
                                                            variant="standard"
                                                            value={card.data}
                                                            className="noUnderlineInput"
                                                            onChange={(p_Event) => {

                                                                const scene = Object.assign({}, this.state.scene);
                                                                card.data = p_Event.target.value
                                                                this.fSetState({ scene });
                                                            }}
                                                        />
                                                    </div>
                                                </Draggable>
                                            );
                                        })}
                                    </Container>
                                    <div className="ContainerFooter">
                                        <Button startIcon={<Add />} onClick={() => {

                                            const scene = Object.assign({}, this.state.scene);
                                            var oTask = column.fAddTask();
                                            this.fSetState({ scene }, function () {

                                                let oElem: any = document.querySelector("#t" + oTask.id + " textarea");
                                                oElem.focus();
                                            });
                                        }} >
                                            Neue Karte
                                        </Button>
                                    </div>
                                </div>
                            </Draggable>
                        );
                    })}
                </Container>
            </div >
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
        this.fSetState({ scene });
    }

    onCardDrop(columnId: any, dropResult: any) {
        console.log("onCardDrop", columnId, dropResult);
        const scene = Object.assign({}, this.state.scene);
        if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {

            const draggedTask = dropResult.payload;
            const oParent: ITasksContainer = scene.children.filter((p: any): any => p.id === columnId)[0];

            if (dropResult.addedIndex !== null) {

                draggedTask.parentId = oParent.id;
            }
            oParent.children = applyDrag(oParent.children, dropResult);

        }
        this.fSetState({ scene });
    }
}

export default Cards;