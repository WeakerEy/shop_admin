/*
 * @Author: WeakerEy 280676418@qq.com
 * @Date: 2023-03-14 12:50:47
 * @LastEditors: WeakerEy 280676418@qq.com
 * @LastEditTime: 2023-03-14 18:55:24
 * @FilePath: \mayapp\src\components\RichTextEditor\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/*
 * @Author: WeakerEy 280676418@qq.com
 * @Date: 2023-03-14 12:50:47
 * @LastEditors: WeakerEy 280676418@qq.com
 * @LastEditTime: 2023-03-14 17:42:07
 * @FilePath: \mayapp\src\components\RichTextEditor\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from 'react'
// 引入编辑器组件
import BraftEditor from 'braft-editor'
// 引入编辑器样式
import 'braft-editor/dist/index.css'
import './index.less'
import AliyunOSSUpload from '../AliyunOSS'
import { ContentUtils } from 'braft-utils'

export default class EditorDemo extends React.Component {

  state = {
    // 创建一个空的editorState作为初始值
    // @ts-ignore
    editorState: BraftEditor.createEditorState(this.props.initialValues ?? null)
  }

  // async componentDidMount () {
  //     // 假设此处从服务端获取html格式的编辑器内容
  //     const htmlContent = await fetchEditorContent()
  //     // 使用BraftEditor.createEditorState将html字符串转换为编辑器需要的editorStat
  //     this.setState({
  //         editorState: BraftEditor.createEditorState(htmlContent)
  //     })
  // }




  // 判断是否为空值，并与FORM联动，更新FORM字段值
  handleEditorChange = (editorState: any) => {
    this.setState({ editorState })
    if (editorState.isEmpty()) {
      // @ts-ignore
      this.props.setFormText('')
    } else {
      let content = editorState.toHTML()
      // @ts-ignore
      this.props.setFormText(content)
    }
  }

  // 插入图片到编辑区中
  InsertPicture = (url: any) => {
    console.log(url)
    this.setState({
      editorState: ContentUtils.insertMedias(this.state.editorState, [{
        type: 'IMAGE',
        url: url
      }])
    })
  }

  render() {

    const extendControls = [
      {
        key: 'antd-uploader',
        type: 'component',
        component: (
          <AliyunOSSUpload accept='image/*'
            InsertPicture={this.InsertPicture}
            showUploadList={false}
          >
            {/* 这里的按钮最好加上type="button"，以避免在表单容器中触发表单提交，用Antd的Button组件则无需如此 */}
            <button type="button" className="control-item button upload-button" data-title="插入图片">
              插入图片
            </button>
          </AliyunOSSUpload>
        )
      }
    ]

    const { editorState } = this.state
    return (
      <div className="my-component">
        <BraftEditor
          value={editorState}
          onChange={this.handleEditorChange}
          // @ts-ignore
          extendControls={extendControls}
        />
      </div>
    )

  }

}