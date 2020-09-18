export default {
  data() {
    //校验手机号的规则
    var checkMobile = (rule, value, cb) => {
      //定义手机验证正则表达式
      const regMobile = /^1[3456789]\d{9}$/;
      if (regMobile.test(value)) {
        return cb();
      }
      return cb(new Error("请输入正确的手机格式"));
    };
    return {
      //医生信息表单
      doctorForm: {
        docId:0,
        account: "",
        password: "",
        name: "",
        phone: "",
        depId: 0,
        gender: "",
        imgUrl: "",
        position: "",
        skillful: "",
        registerPrice: 0,
        introduction: "",
        mark: 0,
      },
      //查询医生信息的数组
      tableData: [
        {
          imgUrlList: [],
        },
      ],
      //科室下拉菜单
      depaOptions: [],
      //控制添加对话框
      addDialogFormVisible: false,
      //控制修改对话框
      updateDialogFormVisible: false,
      //添加医生验证规则
      addFormRules: {
        account: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 4, max: 20, message: "长度在4到15个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 20, message: "长度在6到15个字符", trigger: "blur" },
        ],
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 2, max: 10, message: "长度在2到10", trigger: "blur" },
        ],
        phone: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          { validator: checkMobile, trigger: "blur" },
        ],
        skillful: [
          { required: true, message: "请输入医生擅长", trigger: "blur" },
          { min: 5, max: 250, message: "长度在2到250", trigger: "blur" },
        ],
        introduction: [
          { required: true, message: "请输入医生简介", trigger: "blur" },
          { min: 5, max: 250, message: "长度在2到250", trigger: "blur" },
        ],
        imgUrl:[
          {required:true,message:'请选择图片',trigger:'blur'}
        ]
        },
      imageUrl: "",
      //分页对象页码，页大小
      pageInfo:{
        pageNum: 1,
        pageSize: 5
      }
    };
  },
  methods: {
    //删除医生的方法
    async deletedoctor(id){
        const {data:res}= await this.$http.delete(`delById/{id}`);
        console.log(res);
    },
    //获取所有医生的方法
    async getdoctorList() {
      const data= new URLSearchParams();
      data.append("name",this.doctorForm.name)
      data.append("depId",this.doctorForm.depId)
      data.append("pageNum",this.pageInfo.pageNum)
      data.append("pageSize",this.pageInfo.pageSize)
      const { data: res } = await this.$http.post("/doctor/queryByDTO",data);
      if (res.code != 200) return;
      //赋值给医生数组对象
      this.pageInfo=res.data
    }, 
    //获取所有科室
    async getDepaList(){
      const { data: res } = await this.$http.get("/doctor/queryDepa");
      if (res.code != 200) return;
      //赋值给科室数组对象
      this.depaOptions=res.data
    },
    //新增医生的函数
    async addDoctor(){

      this.doctorForm.gender=true?this.doctorForm.gender='男':this.doctorForm.gender='女'
      const { data: res } = await this.$http.post("/doctor/save",this.doctorForm);

      if (res.code != 200){
        this.addDialogFormVisible=false
        return this.$message.error("添加失败")
      } 
      //追加到医生数组对象的第一个
      this.pageInfo.list.unshift(res.data)
      //关闭添加对话框
      this.addDialogFormVisible=false

    },
    // 监听pagesize改变事件
    handleSizeChange(newSize) {
      this.pageInfo.pageSize = newSize;
      this.getdoctorList();
    },
    //监听页码值改变事件
    handleCurrentChange(newPage) {
      this.pageInfo.pageNum = newPage;
      this.getdoctorList();
    },
    //选择医生职称时,推荐挂号价格
    registerPrice() {
      switch (this.doctorForm.position) {
        case "主任医生":
          this.doctorForm.registerPrice = 300;
          break;
        case "副主任医生":
          this.doctorForm.registerPrice = 80;
          break;
        case "主治医生":
          this.doctorForm.registerPrice = 100;
          break;
        case "住院医生":
          this.doctorForm.registerPrice = 30;
          break;
      }
    },
    //关闭时清空添加对话框信息以及验证规则
    addDialogClose() {
      this.$refs.addFormRef.clearValidate();
      this.doctorForm = "";
      this.imageUrl = "";
    },
    //图片上传成功的函数
    handleAvatarSuccess(res, file) {
      //把成功上传的头像路径保存到表单
      this.doctorForm.imgUrl = res.data;
      //成功之后显示头像
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    //上传图片的函数
    beforeAvatarUpload(file) {
      //改写原始上传代码,判断数组中是否包含要上传的文件类型，原始只支持JPG
      const isIMG = ["image/jpeg", "image/png"].includes(file.type);
      //获取原始图片大小，除以1024等于KB，在除以1024等于MB小于2就是小于2MB
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isIMG) {
        this.$message.error("上传头像图片只能是 JPG或者PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isIMG && isLt2M;
    }
  },
  created() {
    this.getdoctorList();
    this.getDepaList();
  }
};
