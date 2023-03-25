import { createCategory, getCategoryTable } from '@/services/ant-design-pro/api'
import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons'
import { PageContainer, ProTable } from '@ant-design/pro-components'
import { Button, Dropdown, Modal } from 'antd'
import React, { useRef, useState } from 'react'
import CreateCategory from './components/CreateCategory'
import EditCategory from './components/Edit/Edit'

export default function Category() {

  let [isModalOpenCreate, setIsModalOpenCreate] = useState(false)
  let [isModalOpenEdit, setIsModalOpenEdit] = useState(false)
  let [options, setOptions] = useState(false)
  let [currentCategory, setCurrentCategory] = useState()

  let actionRef = useRef()

  async function handleGetData(params) {
    let res = await getCategoryTable(params)
    let options = res.filter((item) => item.pid == 0)
    setOptions(options)
    return {
      data: res,
      success: true,
    }
  }

  function newCategory() {
    setIsModalOpenCreate(true)
  }

  function Edit(data) {
    setIsModalOpenEdit(true)
    setCurrentCategory(data)
  }



  // 列数据
  let columns = [
    {
      title: '分类',
      dataIndex: 'name',
      search: false,
      // @ts-ignore
      render: (_, data) => {
        return <span>{data.name}</span>
      }
    },
    {
      title: '操作',
      search: false,
      // @ts-ignore
      render: (_, data) => {
        return <a onClick={() => Edit(data)}>编辑</a>
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
          optionRender: false
        }}
        pagination={{
          pageSize: 8,
          onChange: (page) => console.log(page),
        }}
        dateFormatter="string"
        headerTitle="分类列表"
        toolBarRender={() => [
          <Button key="button" icon={<PlusOutlined />} type="primary" onClick={() => newCategory()}>
            新建
          </Button>
        ]}
      />

      <CreateCategory isModalOpenCreate={isModalOpenCreate} setIsModalOpenCreate={setIsModalOpenCreate} options={options} actionRef={actionRef} />
      {
        isModalOpenEdit ?
          <EditCategory isModalOpenEdit={isModalOpenEdit} setIsModalOpenEdit={setIsModalOpenEdit} actionRef={actionRef} currentCategory={currentCategory} options={options} />
          : ''
      }

    </PageContainer>
  )
}
