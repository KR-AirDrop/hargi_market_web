import {
  Divider,
  Form,
  Input,
  InputNumber,
  Button,
  Upload,
  message,
} from "antd";
import "./index.css";
import { useState } from "react";
import { API_URL } from "../config/constants.js";
import axios from "axios";
import { useHistory } from "react-router-dom";

function UploadPage() {
  const [imageUrl, setImageUrl] = useState(null);
  const history = useHistory();
  const onSubmit = (values) => {
    axios
      .post(`${API_URL}/products`, {
        name: values.name,
        description: values.description,
        seller: values.seller,
        price: parseInt(values.price),
        imageUrl: imageUrl,
      })
      .then((result) => {
        console.log(result);
        history.replace("/");
      })
      .catch((error) => {
        console.error(error);
        message.error(`에러가 발생했습니다.${error.message}`);
      });
  };
  const onChangeImage = (info) => {
    if (info.file.status === "uploading") {
      return;
    }
    if (info.file.status === "done") {
      const response = info.file.response;
      const imageUrl = response.imageUrl;
      setImageUrl(imageUrl);
    }
  };
  return (
    <div id="upload_container">
      <Form name="상품 업로드" onFinish={onSubmit}>
        <Form.Item
          name="upload"
          label={<div className="upload_label">상품 사진</div>}
        >
          <Upload
            name="image"
            action={`${API_URL}/image`}
            listType="picture"
            showUploadList={false}
            onChange={onChangeImage}
          >
            {imageUrl ? (
              <img id="upload_image" src={`${API_URL}/${imageUrl}`} />
            ) : (
              <div id="upload_img_placeholder">
                <img src="/images/icons/camera.png" />
                <span>이미지를 업로드 해주세요.</span>
              </div>
            )}
          </Upload>
        </Form.Item>
        <Divider />
        <Form.Item
          label={<div className="upload_label">판매자 명</div>}
          name="seller"
          rules={[{ required: true, message: "판매자 이름을 입력해주세요." }]}
        >
          <Input
            className="upload_name"
            size="large"
            placeholder="이름을 입력해주세요"
          />
        </Form.Item>
        <Divider />
        <Form.Item
          name="name"
          label={<div className="upload_label">상품 이름</div>}
          rules={[{ required: true, message: "상품 이름을 입력해주세요." }]}
        >
          <Input
            className="upload_name"
            size="large"
            placeholder="상품 이름을 입력해주세요."
          />
        </Form.Item>
        <Divider />
        <Form.Item
          name="price"
          label={<div className="upload_label">상품 가격</div>}
          rules={[{ required: true, message: "상품 가격을 입력해주세요." }]}
        >
          <InputNumber
            className="upload_price"
            size="large"
            initialvalues={0}
          />
        </Form.Item>
        <Divider />
        <Form.Item
          name="description"
          label={<div className="upload_label">상품 설명</div>}
          rules={[{ required: true, message: "상품 설명을 입력해주세요." }]}
        >
          <Input.TextArea
            size="large"
            id="product_description"
            showCount
            maxLength={300}
            placeholder="상품 설명을 입력해주세요."
          />
        </Form.Item>
        <Form.Item>
          <Button id="submit_button" size="large" htmlType="submit">
            등록하기
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default UploadPage;
