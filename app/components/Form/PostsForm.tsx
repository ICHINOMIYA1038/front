import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Alert, Button } from "@mui/material/";
import axios from "axios";
import Cookies from "js-cookie";
import TagSelecter from "@/components/TagSelecter";

const PostsForm: React.FC = () => {
  const router = useRouter();
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [pdfFileSizeLimit] = useState(50 * 1024 * 1024);
  const [imageFileSizeLimit] = useState(10 * 1024 * 1024);
  const [formData, setFormData] = useState({
    title: "",
    catchphrase: "",
    maleCount: 0,
    femaleCount: 0,
    totalParticipants: 0,
    duration: "",
    pdfFile: null as null | File,
    image: null as null | File,
    selectedTag: [] as string[],
    fee: "",
    feeText: "",
    credit: "",
    creditText: "",
    contact: "",
    contactText: "",
    modification: "",
    modificationText: "",
    condition: "",
    conditionText: "",
  });

  useEffect(() => {
    const { error } = router.query;
    if (error) {
      setIsError(true);
      setErrorMessage(decodeURIComponent(error as string));
    }
  }, []);

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      totalParticipants: prevData.maleCount + prevData.femaleCount,
    }));
  }, [formData.maleCount, formData.femaleCount]);

  async function sendPageContent(content: any, router: any): Promise<void> {
    try {
      const URL = `${process.env.NEXT_PUBLIC_RAILS_API}/posts`;
      const response = await axios.post(URL, content, {
        headers: {
          "Content-Type": "multipart/form-data",
          uid: Cookies.get("uid"),
          client: Cookies.get("client"),
          "access-token": Cookies.get("access-token"),
        },
      });
      router.push("/");
    } catch (error: any) {
      console.error("Error while sending page content:", error);
      setIsError(true);
      setErrorMessage(error.response.data.error);
      throw error;
    }
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Validation
    if (formData.title?.trim() === "") {
      setIsError(true);
      setErrorMessage("タイトルを入力してください。");
      return;
    }

    if (formData.catchphrase.trim() === "") {
      setIsError(true);
      setErrorMessage("キャッチフレーズを入力してください。");
      return;
    }

    if (formData.maleCount < 0 || formData.femaleCount < 0) {
      setIsError(true);
      setErrorMessage("人数は0以上で入力してください。");
      return;
    }

    if (formData.duration === "") {
      setIsError(true);
      setErrorMessage("上演時間を選択してください。");
      return;
    }

    if (!formData.pdfFile) {
      setIsError(true);
      setErrorMessage("PDFファイルを選択してください。");
      return;
    }

    if (formData.pdfFile.size > pdfFileSizeLimit) {
      setIsError(true);
      setErrorMessage(
        `PDFファイルのサイズは${formatFileSize(
          pdfFileSizeLimit
        )}以下にしてください。`
      );
      return;
    }

    if (formData.image && formData.image.size > imageFileSizeLimit) {
      setIsError(true);
      setErrorMessage(
        `画像のサイズは${formatFileSize(
          imageFileSizeLimit
        )}以下にしてください。`
      );
      return;
    }

    const content = new FormData();
    content.append("post[title]", formData.title.trim());
    content.append("post[mainfile]", formData.pdfFile);
    if (formData.image) {
      content.append("post[postImage]", formData.image);
    }
    content.append("post[catchphrase]", formData.catchphrase.trim());
    content.append("post[number_of_men]", formData.maleCount.toString());
    content.append("post[number_of_women]", formData.femaleCount.toString());
    content.append(
      "post[total_number_of_people]",
      formData.totalParticipants.toString()
    );
    content.append("post[playtime]", formData.duration);
    content.append("post[fee]", formData.fee);
    content.append("tags", formData.selectedTag.join(","));

    sendPageContent(content, router)
      .then(() => {
        setIsError(true);
        setErrorMessage("完了しました。");
      })
      .catch((error) => {
        setIsError(true);
        setErrorMessage("エラーが発生しました。");
      });

    setFormData((prevData) => ({
      ...prevData,
      title: "",
      catchphrase: "",
      maleCount: 0,
      femaleCount: 0,
      totalParticipants: 0,
      duration: "",
      pdfFile: null,
      image: null,
    }));
  };

  const handleChildStateChange = (value: string[]) => {
    setFormData((prevData) => ({
      ...prevData,
      selectedTag: value,
    }));
  };

  const formatFileSize = (size: number) => {
    if (size < 1024) {
      return `${size}B`;
    } else if (size < 1024 * 1024) {
      return `${(size / 1024).toFixed(2)}KB`;
    } else {
      return `${(size / (1024 * 1024)).toFixed(2)}MB`;
    }
  };

  return (
    <div>
      <form className="p-10 " onSubmit={handleSubmit}>
        <h1 className="font-bold text-3xl">脚本登録</h1>

        <div className="m-20">
          <div className="font-bold text-xl">基本情報</div>
          <label className="post-form-label">
            タイトル
            <textarea
              rows={1}
              className="resize-none"
              value={formData.title}
              onChange={(e) => {
                if (e.target.value.length <= 30) {
                  setFormData((prevData) => ({
                    ...prevData,
                    title: e.target.value,
                  }));
                }
              }}
              required
            />
            <div className="post-form-char-count">
              <span>{formData.title?.length}/30</span>
            </div>
          </label>

          <label className="post-form-label">
            キャッチフレーズ:
            <textarea
              className="resize-none"
              rows={3}
              value={formData.catchphrase}
              onChange={(e) => {
                if (e.target.value.length <= 60) {
                  setFormData((prevData) => ({
                    ...prevData,
                    catchphrase: e.target.value,
                  }));
                }
              }}
              required
            />
            <div className="post-form-char-count">
              <span>{formData.catchphrase?.length}/60</span>
            </div>
          </label>

          <div className="post-form-number">
            <label className="post-form-label">
              男:
              <input
                type="number"
                value={formData.maleCount}
                min={0}
                max={21}
                onChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    maleCount: Number(e.target.value),
                  }))
                }
                required
              />
            </label>

            <label className="post-form-label">
              女:
              <input
                type="number"
                value={formData.femaleCount}
                min={0}
                max={21}
                onChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    femaleCount: Number(e.target.value),
                  }))
                }
                required
              />
            </label>

            <label className="post-form-label">
              総人数:
              <input
                type="number"
                value={formData.totalParticipants}
                onChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    totalParticipants: Number(e.target.value),
                  }))
                }
                required
              />
            </label>
          </div>

          <label className="post-form-label">
            上演時間:
            <select
              value={formData.duration}
              onChange={(e) =>
                setFormData((prevData) => ({
                  ...prevData,
                  duration: e.target.value,
                }))
              }
              required
            >
              <option value="">選択してください</option>
              <option value="0">30分未満</option>
              <option value="1">30分以上〜60分未満</option>
              <option value="2">60分以上〜90分未満</option>
              <option value="3">90分以上〜120分未満</option>
              <option value="4">120分以上</option>
            </select>
          </label>
        </div>

        <div className="m-20">
          <div className="font-bold text-3xl">添付ファイル</div>
          <label className="post-form-label">
            PDFファイル:
            <input
              className="post-form-input"
              type="file"
              accept="application/pdf"
              onChange={(e) => {
                const file = e.target.files?.[0] || null;
                if (file) {
                  if (file.size > pdfFileSizeLimit) {
                    setIsError(true);
                    setErrorMessage(
                      `PDFファイルのサイズは${formatFileSize(
                        pdfFileSizeLimit
                      )}以下にしてください。`
                    );
                  } else {
                    setIsError(false);
                    setErrorMessage("");
                    setFormData((prevData) => ({
                      ...prevData,
                      pdfFile: file,
                    }));
                  }
                }
              }}
              required
            />
          </label>

          <label className="post-form-label">
            イメージ画像:
            <input
              className="post-form-input"
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0] || null;
                if (file) {
                  if (file.size > imageFileSizeLimit) {
                    setIsError(true);
                    setErrorMessage(
                      `画像のサイズは${formatFileSize(
                        imageFileSizeLimit
                      )}以下にしてください。`
                    );
                  } else {
                    setIsError(false);
                    setErrorMessage("");
                    setFormData((prevData) => ({
                      ...prevData,
                      image: file,
                    }));
                  }
                }
              }}
            />
          </label>
        </div>

        <TagSelecter onChildStateChange={handleChildStateChange} />

        <label className="post-form-label">
          上演料:
          <select
            className="post-form-input"
            value={formData.fee}
            onChange={(e) =>
              setFormData((prevData) => ({
                ...prevData,
                fee: e.target.value,
              }))
            }
            required
          >
            <option value="">選択してください</option>
            <option value="0">無料</option>
            <option value="1">有料</option>
            <option value="2">その他</option>
          </select>
        </label>

        <label className="post-form-label">
          {(formData.fee === "2" || formData.fee === "1") && (
            <textarea
              className="post-form-input"
              placeholder="料金が必要な場合は記入して下さい。"
              value={formData.feeText}
              onChange={(e) =>
                setFormData((prevData) => ({
                  ...prevData,
                  feeText: e.target.value,
                }))
              }
              rows={4}
              cols={40}
              required
            />
          )}
        </label>

        <label className="post-form-label">
          クレジット:
          <select
            className="post-form-input"
            value={formData.credit}
            onChange={(e) =>
              setFormData((prevData) => ({
                ...prevData,
                credit: e.target.value,
              }))
            }
            required
          >
            <option value="">選択してください</option>
            <option value="0">必要</option>
            <option value="1">不要</option>
            <option value="2">その他</option>
          </select>
        </label>

        <label className="post-form-label">
          {(formData.credit === "0" || formData.credit === "2") && (
            <textarea
              className="post-form-input"
              placeholder="クレジットが必要な場合は、クレジットに記載する名前を記述してください。"
              value={formData.creditText}
              onChange={(e) =>
                setFormData((prevData) => ({
                  ...prevData,
                  creditText: e.target.value,
                }))
              }
              rows={4}
              cols={40}
              required
            />
          )}
        </label>

        <label className="post-form-label">
          作者への連絡:
          <select
            className="post-form-input"
            value={formData.contact}
            onChange={(e) =>
              setFormData((prevData) => ({
                ...prevData,
                contact: e.target.value,
              }))
            }
            required
          >
            <option value="">選択してください</option>
            <option value="0">必要</option>
            <option value="1">不要</option>
            <option value="2">その他</option>
          </select>
        </label>

        <label className="post-form-label">
          {(formData.contact === "2" || formData.contact === "0") && (
            <textarea
              className="post-form-input"
              placeholder="必要の場合は連絡先を必ず記入してください。"
              value={formData.contactText}
              onChange={(e) =>
                setFormData((prevData) => ({
                  ...prevData,
                  contactText: e.target.value,
                }))
              }
              rows={4}
              cols={40}
              required
            />
          )}
        </label>

        <label className="post-form-label">
          脚本の改変
          <select
            className="post-form-input"
            value={formData.modification}
            onChange={(e) =>
              setFormData((prevData) => ({
                ...prevData,
                modification: e.target.value,
              }))
            }
            required
          >
            <option value="">選択してください</option>
            <option value="0">改変不可</option>
            <option value="1">改変自由</option>
            <option value="2">その他</option>
          </select>
        </label>

        <label className="post-form-label">
          {formData.modification === "2" && (
            <textarea
              className="post-form-input"
              placeholder="脚本改変のルールについて自由に記述してください。"
              value={formData.modificationText}
              onChange={(e) =>
                setFormData((prevData) => ({
                  ...prevData,
                  modificationText: e.target.value,
                }))
              }
              rows={4}
              cols={40}
              required
            />
          )}
        </label>

        <label className="post-form-label">
          そのほか条件:
          <select
            className="post-form-input"
            value={formData.condition}
            onChange={(e) =>
              setFormData((prevData) => ({
                ...prevData,
                condition: e.target.value,
              }))
            }
            required
          >
            <option value="">選択してください</option>
            <option value="0">特になし</option>
            <option value="1">あり</option>
          </select>
        </label>

        <label className="post-form-label">
          {formData.condition === "2" && (
            <textarea
              className="post-form-input"
              placeholder="その他の詳細を入力してください"
              value={formData.conditionText}
              onChange={(e) =>
                setFormData((prevData) => ({
                  ...prevData,
                  conditionText: e.target.value,
                }))
              }
              rows={4}
              cols={40}
              required
            />
          )}
        </label>

        <Button color="primary" size="large" variant="contained" type="submit">
          投稿する
        </Button>
      </form>

      {isError && (
        <Alert
          style={{ width: "70%", display: "box", margin: "0 auto" }}
          onClose={() => {
            setIsError(false);
            setErrorMessage("");
          }}
          severity="error"
        >
          {errorMessage}
        </Alert>
      )}
    </div>
  );
};

export default PostsForm;
