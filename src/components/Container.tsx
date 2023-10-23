import {
  Button,
  Card,
  Col,
  Divider,
  Flex,
  Layout,
  Row,
  Tabs,
  TabsProps,
} from "antd";
import CodeMirror from "@uiw/react-codemirror";
import { sql, SQLConfig, StandardSQL } from "@codemirror/lang-sql";
import Columns from "./TabComponents/Columns";
import QueryData from "./TabComponents/QueryData";
import { useContext, useState } from "react";
import { DataContext, DataDispatchContext } from "../store/providers";
import CheckableTags from "./CheckableTags";
import { SELECT_QUERY } from "../store/actions";
import { Query } from "../types/queries";

const contentStyle: React.CSSProperties = {
  minHeight: 120,
  lineHeight: "120px",
  color: "#fff",
  backgroundColor: "#F3F4FD",
  padding: 10,
};

const config: SQLConfig = {
  dialect: StandardSQL,
  upperCaseKeywords: true,
};

const tabItems: TabsProps["items"] = [
  {
    key: "1",
    label: "Columns",
    children: <Columns />,
  },
  {
    key: "2",
    label: "Data",
    children: <QueryData />,
  },
];

const Container = () => {
  const { predefinedQueries, query } = useContext(DataContext);
  const dispatch = useContext(DataDispatchContext);

  const onQueryChange = (query: string) => {
    dispatch({ type: SELECT_QUERY, payload: query });
  };

  const resetToDefaultQuery = () => {
    onQueryChange(predefinedQueries[0]);
  };

  return (
    <Layout.Content style={contentStyle}>
      <Card title="Query">
        <Row>
          <Col span={16}>
            <CodeMirror
              height="100px"
              value={query}
              style={{ outline: "1px solid #cacaca" }}
              extensions={[sql(config)]}
            />
          </Col>
          <Col span={1} />
          <Col span={7}>
            <Flex vertical justify={"space-between"} gap="middle">
              <Button type="primary">Run Query</Button>
              <Button onClick={resetToDefaultQuery}>Reset</Button>
            </Flex>
          </Col>
        </Row>
        <Divider />
        <Row>
          <CheckableTags
            predefinedQueries={predefinedQueries}
            currentQuery={query}
            onQueryChange={onQueryChange}
          />
        </Row>
        <Divider />
        <Tabs items={tabItems} />
      </Card>
    </Layout.Content>
  );
};

export default Container;