/*
 * @Author: WeakerEy 280676418@qq.com
 * @Date: 2023-03-10 20:28:46
 * @LastEditors: WeakerEy 280676418@qq.com
 * @LastEditTime: 2023-03-12 19:06:22
 * @FilePath: \mayapp\src\pages\Dashboard\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { useEffect, useState } from 'react'
import { AccountBookOutlined, ProfileOutlined, UserOutlined } from '@ant-design/icons';
import { Card, Col, Row, Statistic, Skeleton } from 'antd';
import { getInfo } from '@/services/ant-design-pro/api';
import { PageContainer } from '@ant-design/pro-components';


export default function index() {
  let init = {
    users_count:0,
    goods_count:0,
    order_count:0
  }
  let [data, setData] = useState(init)
  let [show, setShow] = useState(false)

  // @ts-ignore
  useEffect(async () => {
    let res = await getInfo()
    let { users_count, goods_count, order_count } = res
    setData({ users_count, goods_count, order_count })
    setShow(true)
  }, [])

  return (
    <PageContainer>
      {
        show ? <Row gutter={16}>
          <Col span={8}>
            <Card bordered={false}>
              <Statistic
                title="用户数量"
                value={data.users_count}
                precision={2}
                valueStyle={{ color: '#3f8600' }}
                prefix={<UserOutlined />}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card bordered={false}>
              <Statistic
                title="商品数量"
                value={data.goods_count}
                precision={2}
                valueStyle={{ color: '#cf1322' }}
                prefix={<AccountBookOutlined />}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card bordered={false}>
              <Statistic
                title="订单数量"
                value={data.order_count}
                precision={2}
                valueStyle={{ color: 'blue' }}
                prefix={<ProfileOutlined />}
              />
            </Card>
          </Col>
        </Row>
          :
          <Skeleton active={true} />
      }
    </PageContainer>
  )
}
