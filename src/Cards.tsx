import { Avatar, AvatarGroup, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Chip, Collapse, IconButton, MenuItem, Paper, TextField, Typography } from "@mui/material";
import React, { Component } from "react";
import { Container, Draggable } from "react-smooth-dnd";
import { IWebservice, ITasksContainer, eSaveType } from "./Interfaces";
import { applyDrag, generateItems } from "./Utils";
import { Add, TagFaces, ConstructionOutlined, Alarm, DeleteForever, DriveFileMove, FileCopy, LocalOffer, OpenInFull, Person, ExpandMore, Favorite, MoreVert, Share } from '@mui/icons-material';
import VMenue from "./VMenue";
import { red } from "@mui/material/colors";

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
        //@ts-ignore
        window["scene"] = this.state;
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
                                <Card className={column.props.className + (column.children.length == 0 ? " emptycontainer" : "")} sx={{
                                    bgcolor: "neutral.main",
                                }}>
                                    <div className="card-column-header">
                                        <TextField
                                            fullWidth
                                            variant="standard"
                                            value={column.name}
                                            className="noUnderlineInput"
                                            onChange={(p_Event) => {

                                                const scene = Object.assign({}, this.state.scene);
                                                column.name = p_Event.target.value
                                                this.fSetState({ scene });
                                            }}
                                        />
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
                                    >
                                        {column.children.map((card: any): any => {
                                            return (
                                                <Draggable key={card.id}>
                                                    <Card id={"t" + card.id} {...card.props} sx={{ maxWidth: 345 }}>
                                                        <CardHeader
                                                            action={
                                                                <VMenue taskcard={card} callback={this.updateGUI.bind(this)} />
                                                            }
                                                            title={
                                                                <TextField
                                                                    multiline
                                                                    fullWidth
                                                                    variant="standard"
                                                                    value={card.data}
                                                                    className={"noUnderlineInput cardtitle"}
                                                                    onChange={(p_Event) => {

                                                                        const scene = Object.assign({}, this.state.scene);
                                                                        card.data = p_Event.target.value
                                                                        this.fSetState({ scene });
                                                                    }}
                                                                />
                                                            }
                                                            subheader="September 14, 2016"
                                                        />
                                                        {/* <CardMedia
                                                            sx={{
                                                                pointerEvents: "none"
                                                            }}
                                                            component="img"
                                                            height="150"
                                                            image="https://placekitten.com/300/150"
                                                            alt="Paella dish"
                                                        /> */}
                                                        {/* <CardContent>
                                                            <Typography variant="body2" color="text.secondary">
                                                                This impressive paella is a perfect party dish and a fun meal to cook
                                                                together with your guests. Add 1 cup of frozen peas along with the mussels,
                                                                if you like.
                                                            </Typography>
                                                        </CardContent> */}
                                                        {/* <CardActions disableSpacing>
                                                            <AvatarGroup max={4}>
                                                                <Avatar alt="Remy Sharp"></Avatar>
                                                                <Avatar alt="Travis Howard"></Avatar>
                                                                <Avatar alt="Cindy Baker"></Avatar>
                                                                <Avatar alt="Agnes Walker"></Avatar>
                                                                <Avatar alt="Trevor Henderson"></Avatar>
                                                            </AvatarGroup>
                                                            <IconButton style={{ marginLeft: "auto" }} aria-label="add to favorites">
                                                                <Favorite />
                                                            </IconButton>
                                                            <IconButton aria-label="share">
                                                                <Share />
                                                            </IconButton>
                                                        </CardActions> */}
                                                    </Card>
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
                                </Card>
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

                draggedTask.parent = oParent;
            }
            oParent.children = applyDrag(oParent.children, dropResult);

        }
        this.fSetState({ scene });
    }

    updateGUI() {

        const scene = Object.assign({}, this.state.scene);
        this.fSetState({ scene });
    }
}

export default Cards;