import React, { memo } from 'react';
import { ProfileList, ListItem, More } from '../pages/Styles';
import { Card, Icon } from 'antd';
import PropTypes from 'prop-types';

const FollowList = memo(
  ({ header, hasMore, onClickMore, data, onClickStop }) => {
    return (
      <ProfileList
        grid={{ gutter: 4, xs: 2, md: 3 }}
        size="small"
        header={<div>{header}</div>}
        loadMore={hasMore && <More onClick={onClickMore}>더보기</More>}
        bordered
        dataSource={data}
        renderItem={(item) => (
          <ListItem>
            <Card
              actions={[
                <Icon key="stop" type="stop" onClick={onClickStop(item.id)} />,
              ]}
            >
              <Card.Meta description={item.nickname} />
            </Card>
          </ListItem>
        )}
      />
    );
  },
);

FollowList.prototype = {
  header: PropTypes.string.isRequired,
  hasMore: PropTypes.bool.isRequired,
  onClickMore: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
  onClickStop: PropTypes.func.isRequired,
};

export default FollowList;
