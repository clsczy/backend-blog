import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Card, Input, Tooltip, Icon, Select, Row, Col, Checkbox, Button } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import Editor from 'for-editor';

@connect(({ createSucess, loading }) => ({
  createSucess,
  loading: loading.models.list,
}))
class ArticleComponent extends PureComponent {
  state = {
    title: '',
    content: '',
    tags: [],
    category: '',
  };

  handleTitleChange = event => {
    this.setState({
      title: event.target.value,
    });
  };

  handleEditorChange = content => {
    this.setState({
      content,
    });
  };

  handleCategoryChange = value => {
    this.setState({
      category: value,
    });
  };

  handleTagChange = value => {
    this.setState({
      tags: value,
    });
  };

  handleSubmit = ({ state }) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'articles/submit',
      payload: {
        state,
        ...this.state,
      },
    });
  };

  render() {
    const normalCenter = {
      textAlign: 'center',
      marginBottom: 10,
    };
    const { title, category, content, tags } = this.state;
    const tagList = ['js', 'react', 'vue'];
    const categoryList = ['js', 'react', 'vue'];
    const children = [];
    const categoryChildren = [];

    for (let i = 0; i < tagList.length; i++) {
      const e = tagList[i];
      children.push(<Select.Option key={i}>{e}</Select.Option>);
    }
    for (let i = 0; i < categoryList.length; i++) {
      const e = categoryList[i];
      categoryChildren.push(<Select.Option key={i}>{e}</Select.Option>);
    }
    return (
      <PageHeaderWrapper title="文章编辑(～￣▽￣)">
        <Card bordered={false}>
          <Input
            style={normalCenter}
            addonBefore="标题"
            size="large"
            placeholder="标题"
            name="title"
            value={title}
            onChange={this.handleTitleChange}
          />
          <Select
            allowClear
            style={{ width: 200, marginLeft: 10, marginBottom: 10 }}
            placeholder="文章分类"
            value={category}
            onChange={this.handleCategoryChange}
          >
            {categoryChildren}
          </Select>
          <Select
            allowClear
            mode="multiple"
            value={tags}
            style={{ width: 200, marginLeft: 10, marginBottom: 20 }}
            placeholder="技术标签"
            defaultValue={['js']}
            onChange={this.handleTagChange}
          >
            {children}
          </Select>

          <div style={{ paddingBottom: '20px' }}>
            <Editor value={content} onChange={this.handleEditorChange} />
          </div>
          <div style={{ float: 'right' }}>
            <Button type="primary" onClick={() => this.handleSubmit({ state: 1 })}>
              发布
            </Button>{' '}
            <Button type="primary" onClick={() => this.handleSubmit({ state: 0 })}>
              保存
            </Button>
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}
export default ArticleComponent;
