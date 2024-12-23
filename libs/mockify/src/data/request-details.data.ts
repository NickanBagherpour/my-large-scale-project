export const requestInfoData = [
  {
    requestId: '123',
    requestGeneralInfo: {
      requestStatus: {
        businessBankingStatus: { code: '01', title: 'در انتظار بررسی' },
        businessUnitStatus: { code: '02', title: 'تایید اولیه' },
        // requestStatus: { code: "03" , title: 'تایید نهایی' },
        // requestStatus: { code: "04" , title: 'رد شده' },
        // { code: '02', title: 'تایید اولیه' }
        // business_banking: { code: '01', title: 'در انتظار بررسی' },
      },
      organizationName: 'گروه صنایع گلرنگ',
      clientName: 'تپسی فود',
      registerDate: '1403/04/11',
      companyAgentName: ' سید محمد دلمزیار',
    },
    companyInfo: {
      legalPersonName: 'شرکت داده پرداز مانا دی سلامت',
      nationalId: '14009904586',
      legalPersonType: 'سهامی عام',
      registerNumber: '575229',
      registerDate: '1399/12/28',
      activityField: 'الکترونیک',
      economicCode: '14009904586',
      lastRegisteredAddress: 'شهر تهران، مهران، کوچه بارانک نهم، خیابان شهید نوراله کمانی (فرهنگ شمالی)، پلاک 2',
      postalCode: '1471876956',
      phone: '02155366655',
    },
    agentsInfo: {
      agentFullName: 'نام و نام خانوادگی',
      mobile: '09123456789',
      phone: '02133445566',
      technicalAgentFullName: 'نام و نام خانوادگی',
      technicalAgentMobile: '09123456789',
      technicalAgentPhone: '02133445566',
    },
  },
  {
    requestId: '456',
    requestGeneralInfo: {
      requestStatus: { code: '02', title: 'تایید شده' },
      organizationName: 'گروه صنایع گلرنگ',
      clientName: 'تپسی فود',
      registerDate: '1403/04/11',
      companyAgentName: ' سید محمد دلمزیار',
    },
    companyInfo: {
      legalPersonName: 'شرکت داده پرداز مانا دی سلامت',
      nationalId: '14009904586',
      legalPersonType: 'سهامی عام',
      registerNumber: '575229',
      registerDate: '1399/12/28',
      activityField: 'الکترونیک',
      economicCode: '14009904586',
      lastRegisteredAddress: 'شهر تهران، مهران، کوچه بارانک نهم، خیابان شهید نوراله کمانی (فرهنگ شمالی)، پلاک 2',
      postalCode: '1471876956',
      phone: '02155366655',
    },
    agentsInfo: {
      agentFullName: 'نام و نام خانوادگی',
      mobile: '09123456789',
      phone: '02133445566',
      technicalAgentFullName: 'نام و نام خانوادگی',
      technicalAgentMobile: '09123456789',
      technicalAgentPhone: '02133445566',
    },
  },
  {
    requestId: '789',
    requestGeneralInfo: {
      requestStatus: { code: '03', title: 'رد شده' },
      organizationName: 'گروه صنایع گلرنگ789',
      clientName: 'تپسی فود',
      registerDate: '1403/04/11',
      companyAgentName: ' سید محمد دلمزیار',
    },
    companyInfo: {
      legalPersonName: 'شرکت داده پرداز مانا دی سلامت',
      nationalId: '14009904586',
      legalPersonType: 'سهامی عام',
      registerNumber: '575229',
      registerDate: '1399/12/28',
      activityField: 'الکترونیک',
      economicCode: '14009904586',
      lastRegisteredAddress: 'شهر تهران، مهران، کوچه بارانک نهم، خیابان شهید نوراله کمانی (فرهنگ شمالی)، پلاک 2',
      postalCode: '1471876956',
      phone: '02155366655',
    },
    agentsInfo: {
      agentFullName: 'نام و نام خانوادگی',
      mobile: '09123456789',
      phone: '02133445566',
      technicalAgentFullName: 'نام و نام خانوادگی',
      technicalAgentMobile: '09123456789',
      technicalAgentPhone: '02133445566',
    },
  },
];

export const requestedServicesData = Array.from({ length: 8 }).map(() => ({
  serviceId: '1',
  serviceName: 'samat-lc-gutr-del',
  persianName: 'دریافت کد‌های ملی متعلق به یک شماره موبایل',
}));

export const requestResultData = [
  {
    requestId: '123',
    businessBanking: {
      resultDate: '1403/04/11',
      expertName: 'ابراهیم سبحانی',
      resultReason:
        'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد.',
    },
    businessUnit: {
      contractDate: '1403/04/11',
      contractDescription:
        'قرارداد بین شرکت و واحد کسب و کار شرکت داده ورزی سداد در تاریخ مذکور برای سرویس‌های درخواست شده منعقد گردید.',
    },
  },
];
