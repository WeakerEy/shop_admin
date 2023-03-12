import { disUser, getUserTable } from '@/services/ant-design-pro/api';
import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Avatar, Button, Dropdown, message, Switch } from 'antd';
import { useRef, useState } from 'react'
import Create from './components/CreateUser/Create';
import Edit from './components/Edit/Edit';


export default function UserTable() {

  // 引用表格，方便自定义触发表格
  const actionRef = useRef();
  let [isModalOpen, setIsModalOpen] = useState(false)
  let [isModalOpenEdit, setIsModalOpenEdit] = useState(false)
  let [currentUserInfo, setCurrentUserInfo] = useState()

  /** 获取用户表格数据
   * @description: 获取用户表格数据
   * @param {*} params 
   * @return {*}
   */
  async function handleGetData(params:any) {
    let res = await getUserTable(params)
    return {
      data: res.data,
      success: true,
      total: res.meta.pagination.total
    }
  }

  /** 启用/禁用用户
   * @description: 启用/禁用用户
   * @param {*} data
   * @return {*}
   */
  async function handleDisUser(data:any) {
    let res = await disUser(data)
    if (!res.status && data.is_locked == 1) {
      message.success('恢复成功')
      // @ts-ignore
      actionRef.current.reload();
    } else if (!res.status && data.is_locked == 0) {
      message.error('已禁用')
      // @ts-ignore
      actionRef.current.reload();
    }
  }

  // 打开新建用户对话框
  function newUser() {
    setIsModalOpen(true)
  }
  // 打开编辑用户对话框
  function editUser(info:any) {
    setIsModalOpenEdit(true)
    setCurrentUserInfo(info)
  }



  // 列数据
  let columns = [
    {
      title: '头像',
      dataIndex: 'avatar_url',
      search: false,
      // @ts-ignore
      render: (_, data) => {
        return <Avatar size={32} src={data.avatar_url} />
      }
    },
    {
      title: '昵称',
      dataIndex: 'name',
      // @ts-ignore
      render: (_, data) => {
        return <span>{data.name}</span>
      }
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      // @ts-ignore
      render: (_, data) => {
        return <span>{data.email}</span>
      }
    },
    {
      title: '是否禁用',
      dataIndex: 'is_locked',
      search: false,
      // @ts-ignore
      render: (_, data) => {
        return <Switch
          checkedChildren="开启"
          unCheckedChildren="禁用"
          defaultChecked={data.is_locked === 0}
          onChange={() => handleDisUser(data)}
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
        return <a onClick={() => editUser(data)}>编辑</a>
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
      <Edit isModalOpenEdit={isModalOpenEdit} setIsModalOpenEdit={setIsModalOpenEdit} actionRef={actionRef} currentUserInfo={currentUserInfo} />
    </PageContainer>
  )

}
