import { disGodds, disUser, getGoodsInfo, getGoodsTable, getUserTable, isRecommend } from '@/services/ant-design-pro/api';
import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, Dropdown, message, Switch, Image } from 'antd';
import { useRef, useState } from 'react'
import Create from './components/CreateGoods/Create';
import Edit from './components/Edit/Edit';


export default function UserTable() {

  // 引用表格，拿到表格实例，方便自定义触发表格
  const actionRef = useRef();
  let [isModalOpen, setIsModalOpen] = useState(false)
  let [isModalOpenEdit, setIsModalOpenEdit] = useState(false)
  let [currentGoodsInfo, setCurrentGoddsInfo] = useState()

  /** 获取商品表格数据
   * @description: 获取用户表格数据
   * @param {*} params 
   * @return {*}
   */
  async function handleGetData(params: any) {
    let res = await getGoodsTable(params)

    return {
      data: res.data,
      success: true,
      total: res.meta.pagination.total
    }
  }

  /** 上下架商品
   * @description: 上下架商品
   * @param {*} data
   * @return {*}
   */
  async function handleDisGoods(data: any) {
    let res = await disGodds(data.id)
    if (!res.status && data.is_on == 0) {
      message.success('上架成功')
      // @ts-ignore
      actionRef.current.reload();
    } else if (!res.status && data.is_on == 1) {
      message.error('已下架')
      // @ts-ignore
      actionRef.current.reload();
    }
  }

  /** 是否推荐商品
   * @description: 是否推荐商品
   * @param {*} data
   * @return {*}
   */
  async function handleIsRecommend(data: any) {
    let res = await isRecommend(data.id)
    if (!res.status && data.is_recommend == 0) {
      message.success('已推荐')
      // @ts-ignore
      actionRef.current.reload();
    } else if (!res.status && data.is_recommend == 1) {
      message.error('取消推荐')
      // @ts-ignore
      actionRef.current.reload();
    }
  }

  // 打开新建商品对话框
  function newUser() {
    setIsModalOpen(true)
  }
  // 打开编辑商品对话框
  async function editGodds(info: any) {
    let res = await getGoodsInfo(info.id)
    setIsModalOpenEdit(true)
    setCurrentGoddsInfo(res)
  }



  // 列数据
  let columns = [
    {
      title: '商品',
      dataIndex: 'cover_url',
      search: false,
      // @ts-ignore
      render: (_, data) => {
        return <Image
          width={100}
          src={data.cover_url}
          placeholder={
            <Image
              preview={false}
              src={data.cover_url}
              width={200}
            />
          }
        />
      }
    },
    {
      title: '标题',
      dataIndex: 'title',
      // @ts-ignore
      render: (_, data) => {
        return <span>{data.title}</span>
      }
    },
    {
      title: '价格',
      dataIndex: 'price',
      search: false,
      // @ts-ignore
      render: (_, data) => {
        return <span>{data.price}</span>
      }
    },
    {
      title: '分类',
      dataIndex: 'category_id',
      // @ts-ignore
      render: (_, data) => {
        return <span>{data.category_id}</span>
      }
    },
    {
      title: '库存',
      dataIndex: 'stock',
      search: false,
      // @ts-ignore
      render: (_, data) => {
        return <span>{data.stock}</span>
      }
    },
    {
      title: '销量',
      dataIndex: 'sales',
      search: false,
      // @ts-ignore
      render: (_, data) => {
        return <span>{data.sales}</span>
      }
    },
    {
      title: '是否上架',
      dataIndex: 'is_on',
      valueType: 'radioButton',
      valueEnum: {
        0: { text: '已下架' },
        1: { text: '上架' }
      },
      // @ts-ignore
      render: (_, data) => {
        return <Switch
          checkedChildren="上架"
          unCheckedChildren="下架"
          defaultChecked={data.is_on === 1}
          onChange={() => handleDisGoods(data)}
        />
      }
    },
    {
      title: '是否推荐',
      dataIndex: 'is_recommend',
      valueType: 'radioButton',
      valueEnum: {
        0: { text: '不推荐' },
        1: { text: '推荐' }
      },
      // @ts-ignore
      render: (_, data) => {
        return <Switch
          checkedChildren="已推荐"
          unCheckedChildren="不推荐"
          defaultChecked={data.is_recommend === 1}
          onChange={() => handleIsRecommend(data)}
        />
      }
    },
    {
      title: '修改时间',
      dataIndex: 'created_at',
      search: false,
      // @ts-ignore
      render: (_, data) => {
        return <span>{data.created_at}</span>
      }
    },
    {
      title: '操作',
      search: false,
      // @ts-ignore
      render: (_, data) => {
        return <a onClick={() => editGodds(data)}>编辑</a>
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
          collapsed: false
        }}
        pagination={{
          pageSize: 8,
          onChange: (page) => console.log(page),
        }}
        dateFormatter="string"
        headerTitle="商品列表"
        toolBarRender={() => [
          <Button key="button" icon={<PlusOutlined />} type="primary" onClick={newUser}>
            新建
          </Button>,
          <Dropdown
            key="menu"
            menu={{
              items: [
                {
                  label: '1st item',
                  key: '1',
                },
                {
                  label: '2nd item',
                  key: '1',
                },
                {
                  label: '3rd item',
                  key: '1',
                },
              ],
            }}
          >
            <Button>
              <EllipsisOutlined />
            </Button>
          </Dropdown>,
        ]}
      />
      <Create isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} actionRef={actionRef} />
      <Edit isModalOpenEdit={isModalOpenEdit} setIsModalOpenEdit={setIsModalOpenEdit} actionRef={actionRef} currentGoodsInfo={currentGoodsInfo} />
    </PageContainer>
  )

}
