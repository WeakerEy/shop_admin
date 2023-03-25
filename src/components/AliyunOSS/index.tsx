import { useEffect, useState } from 'react';
import type { UploadProps } from 'antd';
import { message, Upload } from 'antd';
import type { UploadFile } from 'antd/es/upload/interface';
import { getOSS } from '@/services/ant-design-pro/api';

interface OSSDataType {
  dir: string;
  expire: string;
  host: string;
  accessid: string;
  policy: string;
  signature: string;
}

interface AliyunOSSUploadProps {
  value?: UploadFile[];
  onChange?: (fileList: UploadFile[]) => void;
}

export default function AliyunOSSUpload(props: any, { value, onChange }: AliyunOSSUploadProps) {
  const [OSSData, setOSSData] = useState<OSSDataType>();


  // 拿到OSS的签名权限
  const init = async () => {
    try {
      const result = await getOSS();
      console.log(result)
      setOSSData(result);
    } catch (error) {
      message.error(error);
    }
  };

  useEffect(() => {
    init();
  }, []);

  // 触发onChange事件时执行
  const handleChange: UploadProps['onChange'] = ({ fileList }) => {
    console.log('Aliyun OSS:', fileList);
    if (fileList.length && fileList[0].status === 'done') {
      message.success('上传成功')
      // @ts-ignore
      if (props.setFormValue) {
        // @ts-ignore
        props.setFormValue(fileList[0].cover)
      }
      if (props.InsertPicture) {
        props.InsertPicture(fileList[0].url)
      }
    }
    onChange?.([...fileList]);
  };

  const onRemove = (file: UploadFile) => {
    const files = (value || []).filter((v) => v.url !== file.url);

    if (onChange) {
      onChange(files);
    }
  };

  const getExtraData: UploadProps['data'] = (file) => ({
    key: file.url,
    OSSAccessKeyId: OSSData?.accessid,
    policy: OSSData?.policy,
    Signature: OSSData?.signature,
  });

  const beforeUpload: UploadProps['beforeUpload'] = async (file) => {
    if (!OSSData) return false;

    const expire = Number(OSSData.expire) * 1000;

    if (expire < Date.now()) {
      await init();
    }

    let dirRoot = 'react/'
    const suffix = file.name.slice(file.name.lastIndexOf('.'));
    const filename = dirRoot + Date.now() + suffix;
    // @ts-ignore
    file.url = OSSData.host + OSSData.dir + filename;
    file['cover'] = OSSData.dir + filename

    return file;
  };

  const uploadProps: UploadProps = {
    name: 'file',
    fileList: value,
    action: OSSData?.host,
    onChange: handleChange,
    onRemove,
    data: getExtraData,
    beforeUpload,
    maxCount: 1,
    listType: 'picture',
    accept: props.accept || '',
    showUploadList: props.showUploadList
  };
  return (
    <Upload {...uploadProps}>
      {props.children}
    </Upload>
  );
};
