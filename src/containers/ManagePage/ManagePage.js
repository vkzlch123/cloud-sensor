import React from "react";
import {
  Hospitals,
  Hospital,
  Floor,
  Room,
  Patients,
  Sensors
} from "../ManagePage";
import { Route } from "react-router-dom";
import styled from "styled-components";

const InnerContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  flex-direction: column;
`;

const ManagePage = ({ match }) => {
  const { url } = match;
  return (
    <InnerContainer>
      <Route exact path={`${url}`} component={Hospitals} />
      <Route exact path={`${url}/hospital=:id`} component={Hospital} />
      <Route
        exact
        path={`${url}/hospital=:id/floor=:floor_id`}
        component={Floor}
      />
      <Route
        exact
        path={`${url}/hospital=:id/floor=:floor_id/room=:room_id`}
        component={Room}
      />
      <Route exact path={`${url}/patients`} component={Patients} />
      <Route exact path={`${url}/sensors`} component={Sensors} />
    </InnerContainer>
  );
};
export default ManagePage;
