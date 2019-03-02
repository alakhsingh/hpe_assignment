import React, { Component } from "react";
import "./DisplayWordData.css";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button
} from "reactstrap";
export default class resultCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      val: this.props.value
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ val: nextProps.value });
  }

  render() {
    const disp = this.state.val;
    return (
      <div className="display-result">
        <Card>
          <CardBody>
            <CardTitle>{disp.word}</CardTitle>
            <CardSubtitle>
              This word appeared {disp.total_count} times in{" "}
              {disp.in_files.length} files
            </CardSubtitle>
            <CardText>
              {disp.in_files.map(n => {
                return (
                  <span>
                    {n.file + "         "}
                    {n.count}
                    <br />
                  </span>
                );
              })}
            </CardText>
          </CardBody>
        </Card>
      </div>
    );
  }
}
