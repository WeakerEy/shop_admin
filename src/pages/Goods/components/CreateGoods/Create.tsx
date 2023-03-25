import AliyunOSSUpload from '@/components/AliyunOSS'
import EditorDemo from '@/components/RichTextEditor'
import { createGodds, getCategoryTable } from '@/services/ant-design-pro/api'
import { UploadOutlined } from '@ant-design/icons'
import { ProForm, ProFormDigit, ProFormText, ProFormTextArea } from '@ant-design/pro-components'
import { Button, Cascader, message, Modal } from 'antd'
import { useState, useEffect } from 'react'



export default function Create(props: any) {

  let { isModalOpen, setIsModalOpen, actionRef } = props
  let [options, setOptions] = useState()
  let [form] = ProForm.useForm()

  // @ts-ignore
  useEffect(async () => {
    let res = await getCategoryTable()
    setOptions(() => res)
  }, [])

  // 关闭新建对话框
  function handleCancel() {
    setIsModalOpen(false)
  }

  // 提交表单
  async function subForm(values: any) {
    let data = { ...values, category_id: values.category_id[1] }
    let res = await createGodds(data)
    // @ts-ignore
    if (!res.status) {
      setIsModalOpen(false)
      message.success('添加成功')
      actionRef.current.reload();
    }
  }

  // 让上传组件与FORM联动
  function setFormValue(value: any) {
    form.setFieldsValue({ 'cover': value })
  }

  // 让富文本与FORM联动
  function setFormText(value: any) {
    form.setFieldsValue({ 'details': value })
  }


  return (
    <Modal title="创建新商品" open={isModalOpen} onCancel={handleCancel} footer={null} destroyOnClose={true}>
      <ProForm
        // @ts-ignore
        onFinish={(values) => subForm(values)}
        grid={true}
        form={form}
      >
        <ProFormText
          width="md"
          name="category_id"
          label="分类"
          rules={[
            {
              required: true,
              message: '请选择商品的分类',
            }
          ]}
        >
          <Cascader options={options} fieldNames={{ label: 'name', value: 'id' }} placeholder="请选择商品的分类" />
        </ProFormText>

        <ProFormText
          width="md"
          name='title'
          label="商品名"
          placeholder="请输入商品名"
          rules={[
            {
              required: true,
              message: '请输入商品名',
            }
          ]}
        />
        <ProFormTextArea
          width="md"
          name='description'
          label="描述"
          placeholder="请输入描述商品的字段"
          rules={[
            {
              required: true,
              message: '请输入描述商品的字段',
            }
          ]}
        />
        <ProFormDigit
          width="md"
          name='price'
          label="价格"
          placeholder="请输入商品的价格"
          min={1} max={9999999999}
          rules={[
            {
              required: true,
              message: '请输入商品的价格',
            }
          ]}
        />
        <ProFormDigit
          width="md"
          name='stock'
          label="库存"
          placeholder="请输入商品的库存"
          min={0} max={9999999999}
          rules={[
            {
              required: true,
              message: '请输入商品的库存',
            }
          ]}
        />
        <ProFormText
          width="md"
          name='cover'
          label="封面图"
          placeholder="请放入商品的封面图"
          rules={[
            {
              required: true,
              message: '请放入商品的封面图',
            }
          ]}
        >
          <AliyunOSSUpload accept='image/*' setFormValue={setFormValue} showUploadList={true}>
            <Button icon={<UploadOutlined />}>上传图片</Button>
          </AliyunOSSUpload>

        </ProFormText>
        <ProFormText
          width="md"
          name='details'
          label="详情"
          placeholder="请详细描述该商品"
          rules={[
            {
              required: true,
              message: '请详细描述该商品',
            }
          ]}
        >
          {/* @ts-ignore */}
          <EditorDemo setFormText={setFormText}></EditorDemo>
        </ProFormText>
      </ProForm>
    </Modal>
  )
}
