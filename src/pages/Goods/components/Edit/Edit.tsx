/*
 * @Author: WeakerEy 280676418@qq.com
 * @Date: 2023-03-13 00:27:06
 * @LastEditors: WeakerEy 280676418@qq.com
 * @LastEditTime: 2023-03-15 00:03:51
 * @FilePath: \mayapp\src\pages\Goods\components\Edit\Edit.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import AliyunOSSUpload from '@/components/AliyunOSS'
import { getCategoryTable, upDataGoods, upDataUser } from '@/services/ant-design-pro/api'
import { UploadOutlined } from '@ant-design/icons'
import { ProForm, ProFormDigit, ProFormText, ProFormTextArea } from '@ant-design/pro-components'
import { Button, Cascader, message, Modal, Image } from 'antd'
import { useState, useEffect } from 'react'
import EditorDemo from '@/components/RichTextEditor'


export default function Create(props: any) {

  let { isModalOpenEdit, setIsModalOpenEdit, actionRef, currentGoodsInfo } = props
  let [options, setOptions] = useState()
  let [form] = ProForm.useForm()

  // @ts-ignore
  useEffect(async () => {
    let res = await getCategoryTable()
    setOptions(() => res)
  }, [])


  // 关闭新建对话框
  function handleCancel() {
    setIsModalOpenEdit(false)
  }

  // 提交表单
  async function subForm(goods: any, values: any) {
    let params = values.category_id[1] ?? values.category_id[0]
    let data = { ...values, category_id: params }
    let res = await upDataGoods(goods.id, data)
    // @ts-ignore
    if (!res.status) {
      setIsModalOpenEdit(false)
      message.success('修改成功')
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



  //设置form的默认值，让级联选择组件可以根据数组来默认初始值
  let initialValues
  if (currentGoodsInfo) {
    let { pid, id } = currentGoodsInfo?.category
    // 老数据没有二级分类，所以会造成pid为0的情况
    let init = pid == 0 ? [id] : [pid, id]
    initialValues = { ...currentGoodsInfo, category_id: init }
  }

  return (
    <Modal title="创建新用户" open={isModalOpenEdit} onCancel={handleCancel} footer={null} destroyOnClose={true}>
      <ProForm
        // @ts-ignore
        onFinish={(values) => subForm(currentGoodsInfo, values)}
        initialValues={initialValues}
        grid={true}
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

        {/* <ProFormText name='cover' hidden={true} /> */}

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
          {
            currentGoodsInfo?.cover_url ?
              <Image width={100} src={currentGoodsInfo.cover_url}></Image> : ''
          }

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
          <EditorDemo setFormText={setFormText} initialValues={initialValues?.details}></EditorDemo>
        </ProFormText>
      </ProForm>
    </Modal>
  )
}
