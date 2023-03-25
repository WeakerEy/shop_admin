/*
 * @Author: WeakerEy 280676418@qq.com
 * @Date: 2023-03-16 22:53:25
 * @LastEditors: WeakerEy 280676418@qq.com
 * @LastEditTime: 2023-03-17 15:07:31
 * @FilePath: \mayapp\src\pages\Orders\Orders.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { disUser, getOrdersTable, getUserTable, sendGoods } from '@/services/ant-design-pro/api';
import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import { PageContainer, ProForm, ProFormText, ProTable } from '@ant-design/pro-components';
import { Avatar, Button, Dropdown, message, Modal, Switch, Tag, Image, Divider, Select } from 'antd';
import { useRef, useState } from 'react'
import './Order.css'


export default function UserTable() {

  // 引用表格，方便自定义触发表格
  const actionRef = useRef();
  let [isModalOpen, setIsModalOpen] = useState(false)
  let [isModalPost, setIsModalPost] = useState(false)
  let [currentGoods, setCurrentGodds] = useState([])
  let [currentOrder, setCurrentOrder] = useState()
  let [form] = ProForm.useForm()

  /** 获取用户表格数据
   * @description: 获取用户表格数据
   * @param {*} params 
   * @return {*}
   */
  async function handleGetData(params: any) {
    let res = await getOrdersTable(params)
    console.log(res)
    console.log(res.data[0].orderDetails.data[0].price)
    return {
      data: res.data,
      success: true,
      total: res.meta.pagination.total
    }
  }

  // 打开新建用户对话框
  function newUser() {
    setIsModalOpen(true)
  }
  // 打开发货对话框
  function postGoods(info: any) {
    setIsModalPost(true)
    setCurrentOrder(info)
  }
  // 关闭发货对话框
  function endPost(info: any) {
    setIsModalPost(false)
  }

  async function subForm(orderInfo, values) {
    if (orderInfo.status === 1) {
      let orderId = orderInfo.id
      console.log(orderInfo.id, values)
      let res = await sendGoods(orderId, values)
      if (!res.status) {
        setIsModalPost(false)
        message.success('发货成功')
        actionRef.current.reload();
      }
    } else {
      message.error('该订单无法发货')
      setIsModalPost(false)
      actionRef.current.reload();
    }
  }

  //状态显示
  let statusBox = [
    '失败', '下单', '支付', '发货', '收货', '过期'
  ]
  //Tag样式
  let TgaColor = {
    0: 'error',
    1: 'processing',
    2: 'success',
    3: 'processing',
    4: 'success',
    5: 'error'
  }

  //快递类型
  let options = [
    { value: 'SF', label: '顺丰' },
    { value: 'YTO', label: '圆通' },
    { value: 'YD', label: '韵达' },
  ]

  function handleChange(value) {
    form.setFieldsValue({ 'express_type': value })
  }


  //订单详情
  function OrderDetails(data) {
    let goods = data.goods.data
    let order = data.orderDetails.data[0]
    setIsModalOpen(true)
    setCurrentGodds(goods)
    setCurrentOrder(order)
  }

  function handleCancel() {
    setIsModalOpen(false)
  }



  // 列数据
  let columns = [
    {
      title: '单号',
      dataIndex: 'order_no',
      // @ts-ignore
      render: (_, data) => {
        return <span>{data.order_no}</span>
      }
    },
    {
      title: '用户',
      dataIndex: 'name',
      search: false,
      // @ts-ignore
      render: (_, data) => {
        return <span>{data.user.name}</span>
      }
    },
    {
      title: '金额',
      dataIndex: 'price',
      search: false,
      // @ts-ignore
      render: (_, data) => {
        return <span>{data.orderDetails.data[0]?.price}</span>
      }
    },
    {
      title: '状态',
      dataIndex: 'status',
      // @ts-ignore
      render: (_, data) => {
        return <span><Tag color={TgaColor[data.status]}>{statusBox[data.status]}</Tag></span>
      }
    },
    {
      title: '支付时间',
      dataIndex: 'pay_time',
      search: false,
      // @ts-ignore
      render: (_, data) => {
        return <span>{data.pay_time}</span>
      }
    },
    {
      title: '支付类型',
      dataIndex: 'pay_type',
      search: false,
      // @ts-ignore
      render: (_, data) => {
        return <span>{data.pay_type}</span>
      }
    },
    {
      title: '支付流水号',
      dataIndex: 'trade_no',
      search: false,
      // @ts-ignore
      render: (_, data) => {
        return <span>{data.trade_no}</span>
      }
    },
    {
      title: '操作',
      search: false,
      // @ts-ignore
      render: (_, data) => {
        return <div>
          <a onClick={() => OrderDetails(data)} style={{ marginRight: '10px' }}>详情</a>
          <a onClick={() => postGoods(data)}> 发货</a>
        </div>
      }
    },
  ]

  return (
    <PageContainer>
      <ProTable
        // @ts-ignore
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={(params = {}, sort, filter) => handleGetData(params)}
        editable={{
          type: 'multiple',
        }}
        rowKey="id"
        search={{
          labelWidth: 'auto',
        }}
        pagination={{
          pageSize: 8,
          onChange: (page) => console.log(page),
        }}
        dateFormatter="string"
        headerTitle="用户列表"
        toolBarRender={() => [
          <Button key="button" icon={<PlusOutlined />} type="primary" onClick={newUser}>
            新建
          </Button>
        ]}
      />

      <Modal title="订单详情" open={isModalOpen} onCancel={handleCancel} footer={false}>
        {
          currentGoods.map(item => {
            let price = currentOrder.price
            let num = currentOrder.num
            return (
              <div>
                <div>
                  <Image height={150} width={150} src={item.cover_url} ></Image>
                  <div style={{ position: 'relative', top: '-130px', left: '200px' }}>
                    <div style={{ fontWeight: 'bold', fontSize: '18px' }}>{item.title}</div>
                    <div className='cutdata'>
                      <span >单位：{currentOrder.price}</span>
                      <span >数量：{currentOrder.num}</span>
                      <span >总价：{price * num}</span>
                    </div>
                  </div>
                </div>
                <Divider style={{ position: 'relative', top: '-50px' }} />
              </div>
            )
          })
        }
      </Modal>
      {
        isModalPost ?
          <Modal title="发货界面" open={isModalPost} onCancel={endPost} footer={false} destroyOnClose={true}>
            <ProForm
              onFinish={(values) => subForm(currentOrder, values)}
              grid={true}
              form={form}
            >
              <ProFormText
                width="md"
                name="express_type"
                label="请选择发放快递"
                placeholder="请选择快递"
                rules={[
                  {
                    required: true,
                    message: '请选择分快递',
                  }
                ]}
              >
                <Select
                  onChange={handleChange}
                  options={options}
                />
              </ProFormText>

              <ProFormText
                width="md"
                name="express_no"
                label="快递单号"
                placeholder="请填写快递单号"
                rules={[
                  {
                    required: true,
                    message: '请填写快递单号',
                  }
                ]}
              />

            </ProForm>
          </Modal>
          :''
      }

    </PageContainer>
  )
}
