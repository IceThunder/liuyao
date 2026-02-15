import { Locale } from './config';

type TranslationValue = Record<Locale, string>;

const translations: Record<string, TranslationValue> = {
  // Navigation
  'nav.title': {
    'zh-CN': '六爻占卜',
    en: 'Liu Yao Divination',
    ja: '六爻占い',
    ko: '육효점',
  },
  'nav.divine': {
    'zh-CN': '起卦',
    en: 'Divine',
    ja: '占う',
    ko: '점치기',
  },
  'nav.hexagrams': {
    'zh-CN': '卦典',
    en: 'Hexagrams',
    ja: '卦典',
    ko: '괘전',
  },
  'nav.history': {
    'zh-CN': '历史',
    en: 'History',
    ja: '履歴',
    ko: '기록',
  },

  // Home page
  'home.title': {
    'zh-CN': '六爻占卜',
    en: 'Liu Yao Divination',
    ja: '六爻占い',
    ko: '육효점',
  },
  'home.subtitle': {
    'zh-CN': '古法铜钱起卦 · 纳甲装卦 · 六亲六神',
    en: 'Ancient Coin Divination · Najia System · Six Relations & Spirits',
    ja: '古法銅銭起卦 · 納甲装卦 · 六親六神',
    ko: '고법동전기괘 · 납갑장괘 · 육친육신',
  },
  'home.description': {
    'zh-CN': '六爻预测，源自《周易》，以三枚铜钱摇卦，六摇而成卦，配以纳甲、六亲、六神，断吉凶、明得失、知进退。',
    en: 'Liu Yao prediction originates from the Book of Changes (I Ching). Cast three coins six times to form a hexagram, interpreted through the Najia system, Six Relations, and Six Spirits to reveal fortune and guidance.',
    ja: '六爻予測は『周易』に源を発し、三枚の銅銭を六回振って卦を立て、納甲・六親・六神を配して吉凶を断じ、得失を明らかにします。',
    ko: '육효 예측은 《주역》에서 비롯되며, 세 개의 동전을 여섯 번 던져 괘를 세우고, 납갑·육친·육신을 배합하여 길흉을 판단합니다.',
  },
  'home.start': {
    'zh-CN': '开始占卜',
    en: 'Start Divination',
    ja: '占いを始める',
    ko: '점치기 시작',
  },
  'home.footer': {
    'zh-CN': '易有太极 是生两仪',
    en: 'The Yi contains Taiji, which generates Yin and Yang',
    ja: '易に太極あり 是れ両儀を生ず',
    ko: '역에 태극이 있으니 이것이 양의를 낳는다',
  },

  // Divine page
  'divine.title': {
    'zh-CN': '铜钱起卦',
    en: 'Coin Divination',
    ja: '銅銭起卦',
    ko: '동전 점괘',
  },
  'divine.question.label': {
    'zh-CN': '求测事项（可选）',
    en: 'Your Question (Optional)',
    ja: 'お尋ねの事柄（任意）',
    ko: '물어볼 사항 (선택)',
  },
  'divine.question.placeholder': {
    'zh-CN': '心中默念所问之事...',
    en: 'Focus on your question...',
    ja: '心の中で問いを念じてください…',
    ko: '마음속으로 질문을 떠올리세요...',
  },
  'divine.toss.counter': {
    'zh-CN': '第 {current} / 6 摇',
    en: 'Toss {current} / 6',
    ja: '第 {current} / 6 振',
    ko: '{current} / 6 회',
  },
  'divine.toss.flipping': {
    'zh-CN': '摇卦中...',
    en: 'Casting...',
    ja: '振卦中…',
    ko: '점괘 중...',
  },
  'divine.toss.first': {
    'zh-CN': '摇第一爻',
    en: 'Cast First Line',
    ja: '第一爻を振る',
    ko: '첫째 효 던지기',
  },
  'divine.toss.continue': {
    'zh-CN': '继续摇卦',
    en: 'Continue Casting',
    ja: '続けて振る',
    ko: '계속 던지기',
  },
  'divine.view.result': {
    'zh-CN': '查看卦象',
    en: 'View Hexagram',
    ja: '卦象を見る',
    ko: '괘상 보기',
  },
  'divine.reset': {
    'zh-CN': '重新起卦',
    en: 'Start Over',
    ja: 'やり直す',
    ko: '다시 시작',
  },
  'divine.yao.cast': {
    'zh-CN': '已摇出的爻',
    en: 'Lines Cast',
    ja: '振り出した爻',
    ko: '던진 효',
  },
  'divine.coin.head': {
    'zh-CN': '字',
    en: 'Head',
    ja: '字',
    ko: '앞',
  },
  'divine.coin.tail': {
    'zh-CN': '花',
    en: 'Tail',
    ja: '花',
    ko: '뒤',
  },

  // Yao position names
  'yao.pos.1': {
    'zh-CN': '初',
    en: '1st',
    ja: '初',
    ko: '초',
  },
  'yao.pos.2': {
    'zh-CN': '二',
    en: '2nd',
    ja: '二',
    ko: '이',
  },
  'yao.pos.3': {
    'zh-CN': '三',
    en: '3rd',
    ja: '三',
    ko: '삼',
  },
  'yao.pos.4': {
    'zh-CN': '四',
    en: '4th',
    ja: '四',
    ko: '사',
  },
  'yao.pos.5': {
    'zh-CN': '五',
    en: '5th',
    ja: '五',
    ko: '오',
  },
  'yao.pos.6': {
    'zh-CN': '上',
    en: '6th',
    ja: '上',
    ko: '상',
  },
  'yao.suffix': {
    'zh-CN': '爻',
    en: '',
    ja: '爻',
    ko: '효',
  },

  // Result page
  'result.title': {
    'zh-CN': '卦象解析',
    en: 'Hexagram Analysis',
    ja: '卦象解析',
    ko: '괘상 해석',
  },
  'result.question.prefix': {
    'zh-CN': '所问：',
    en: 'Question: ',
    ja: 'お尋ね：',
    ko: '질문: ',
  },
  'result.loading': {
    'zh-CN': '加载中...',
    en: 'Loading...',
    ja: '読み込み中…',
    ko: '로딩 중...',
  },
  'result.original': {
    'zh-CN': '本卦',
    en: 'Original',
    ja: '本卦',
    ko: '본괘',
  },
  'result.changed': {
    'zh-CN': '变卦',
    en: 'Changed',
    ja: '変卦',
    ko: '변괘',
  },
  'result.upper': {
    'zh-CN': '上',
    en: 'Upper',
    ja: '上',
    ko: '상',
  },
  'result.lower': {
    'zh-CN': '下',
    en: 'Lower',
    ja: '下',
    ko: '하',
  },
  'result.details.title': {
    'zh-CN': '六爻详情',
    en: 'Six Lines Details',
    ja: '六爻詳細',
    ko: '육효 상세',
  },
  'result.yang': {
    'zh-CN': '⚊ 阳',
    en: '⚊ Yang',
    ja: '⚊ 陽',
    ko: '⚊ 양',
  },
  'result.yin': {
    'zh-CN': '⚋ 阴',
    en: '⚋ Yin',
    ja: '⚋ 陰',
    ko: '⚋ 음',
  },
  'result.moving': {
    'zh-CN': '动爻',
    en: 'Moving',
    ja: '動爻',
    ko: '동효',
  },
  'result.change.yin': {
    'zh-CN': '→ 变阴',
    en: '→ Yin',
    ja: '→ 変陰',
    ko: '→ 변음',
  },
  'result.change.yang': {
    'zh-CN': '→ 变阳',
    en: '→ Yang',
    ja: '→ 変陽',
    ko: '→ 변양',
  },

  // AI Interpretation
  'ai.title': {
    'zh-CN': 'AI 解卦',
    en: 'AI Interpretation',
    ja: 'AI解卦',
    ko: 'AI 해괘',
  },
  'ai.description': {
    'zh-CN': '结合卦象、爻辞、五行生克，为您提供智能解读',
    en: 'AI-powered interpretation combining hexagram symbolism, line texts, and Five Elements analysis',
    ja: '卦象・爻辞・五行の相生相剋を組み合わせた智能解読',
    ko: '괘상, 효사, 오행 생극을 결합한 AI 해석',
  },
  'ai.start': {
    'zh-CN': '开始解卦',
    en: 'Interpret',
    ja: '解卦開始',
    ko: '해괘 시작',
  },
  'ai.stop': {
    'zh-CN': '停止生成',
    en: 'Stop',
    ja: '停止',
    ko: '중지',
  },
  'ai.retry': {
    'zh-CN': '重试',
    en: 'Retry',
    ja: 'リトライ',
    ko: '재시도',
  },
  'ai.regenerate': {
    'zh-CN': '重新解卦',
    en: 'Regenerate',
    ja: '再解卦',
    ko: '다시 해괘',
  },

  // Hexagrams page
  'hexagrams.title': {
    'zh-CN': '六十四卦',
    en: 'The 64 Hexagrams',
    ja: '六十四卦',
    ko: '64괘',
  },
  'hexagrams.subtitle': {
    'zh-CN': '周易六十四卦总览',
    en: 'Complete Overview of the I Ching Hexagrams',
    ja: '周易六十四卦一覧',
    ko: '주역 64괘 총람',
  },
  'hexagrams.search': {
    'zh-CN': '搜索卦名...',
    en: 'Search hexagrams...',
    ja: '卦名を検索…',
    ko: '괘 이름 검색...',
  },
  'hexagrams.card.prefix': {
    'zh-CN': '第{n}卦',
    en: '#{n}',
    ja: '第{n}卦',
    ko: '제{n}괘',
  },
  'hexagrams.empty': {
    'zh-CN': '未找到匹配的卦象',
    en: 'No matching hexagrams found',
    ja: '一致する卦象が見つかりません',
    ko: '일치하는 괘가 없습니다',
  },

  // History page
  'history.title': {
    'zh-CN': '占卜历史',
    en: 'Divination History',
    ja: '占い履歴',
    ko: '점 기록',
  },
  'history.subtitle': {
    'zh-CN': '本地存储的占卜记录',
    en: 'Locally saved divination records',
    ja: 'ローカル保存の占い記録',
    ko: '로컬 저장된 점 기록',
  },
  'history.clear': {
    'zh-CN': '清空全部',
    en: 'Clear All',
    ja: '全削除',
    ko: '전체 삭제',
  },
  'history.clear.confirm': {
    'zh-CN': '确定清空所有历史记录？',
    en: 'Clear all history records?',
    ja: 'すべての履歴を削除しますか？',
    ko: '모든 기록을 삭제하시겠습니까?',
  },
  'history.empty': {
    'zh-CN': '暂无占卜记录',
    en: 'No divination records yet',
    ja: '占い記録はまだありません',
    ko: '점 기록이 없습니다',
  },
  'history.empty.action': {
    'zh-CN': '去起卦 →',
    en: 'Start Divination →',
    ja: '占いを始める →',
    ko: '점치러 가기 →',
  },
  'history.no.question': {
    'zh-CN': '未填写问题',
    en: 'No question specified',
    ja: '質問未入力',
    ko: '질문 미입력',
  },

  // Auth
  'auth.signin.title': {
    'zh-CN': '登录',
    en: 'Sign In',
    ja: 'ログイン',
    ko: '로그인',
  },
  'auth.signin.subtitle': {
    'zh-CN': '登录后可云端同步占卜记录',
    en: 'Sign in to sync your divination records to the cloud',
    ja: 'ログインして占い記録をクラウド同期',
    ko: '로그인하여 점 기록을 클라우드에 동기화',
  },
  'auth.signin.google': {
    'zh-CN': '使用 Google 登录',
    en: 'Sign in with Google',
    ja: 'Googleでログイン',
    ko: 'Google로 로그인',
  },
  'auth.signin.hint': {
    'zh-CN': '未登录也可正常使用，记录仅保存在本地',
    en: 'You can use the app without signing in; records will be saved locally',
    ja: 'ログインしなくても利用可能、記録はローカルに保存されます',
    ko: '로그인 없이도 사용 가능하며, 기록은 로컬에 저장됩니다',
  },
  'auth.user.signout': {
    'zh-CN': '退出登录',
    en: 'Sign Out',
    ja: 'ログアウト',
    ko: '로그아웃',
  },
  'auth.user.signin': {
    'zh-CN': '登录',
    en: 'Sign In',
    ja: 'ログイン',
    ko: '로그인',
  },
  'history.syncing': {
    'zh-CN': '正在同步本地记录到云端...',
    en: 'Syncing local records to cloud...',
    ja: 'ローカル記録をクラウドに同期中…',
    ko: '로컬 기록을 클라우드에 동기화 중...',
  },
  'history.cloud': {
    'zh-CN': '云端',
    en: 'Cloud',
    ja: 'クラウド',
    ko: '클라우드',
  },
  'history.local': {
    'zh-CN': '本地',
    en: 'Local',
    ja: 'ローカル',
    ko: '로컬',
  },

  // AI error messages
  'ai.error.request_failed': {
    'zh-CN': '请求失败',
    en: 'Request failed',
    ja: 'リクエスト失敗',
    ko: '요청 실패',
  },
  'ai.error.no_reader': {
    'zh-CN': '无法读取响应流',
    en: 'Unable to read response stream',
    ja: '応答ストリームを読み取れません',
    ko: '응답 스트림을 읽을 수 없습니다',
  },
  'ai.error.unknown': {
    'zh-CN': '未知错误',
    en: 'Unknown error',
    ja: '不明なエラー',
    ko: '알 수 없는 오류',
  },

  // Footer
  'footer.privacy': {
    'zh-CN': '隐私政策',
    en: 'Privacy Policy',
    ja: 'プライバシーポリシー',
    ko: '개인정보처리방침',
  },
  'footer.terms': {
    'zh-CN': '服务条款',
    en: 'Terms of Service',
    ja: '利用規約',
    ko: '이용약관',
  },
  'footer.disclaimer': {
    'zh-CN': '占卜结果仅供娱乐参考，不构成任何专业建议',
    en: 'Divination results are for entertainment purposes only and do not constitute professional advice',
    ja: '占い結果は娯楽目的のみであり、専門的なアドバイスではありません',
    ko: '점괘 결과는 오락 목적으로만 제공되며 전문적인 조언이 아닙니다',
  },
  'footer.copyright': {
    'zh-CN': '© {year} 六爻占卜',
    en: '© {year} Liu Yao Divination',
    ja: '© {year} 六爻占い',
    ko: '© {year} 육효점',
  },

  // Privacy Policy page
  'legal.privacy.title': {
    'zh-CN': '隐私政策',
    en: 'Privacy Policy',
    ja: 'プライバシーポリシー',
    ko: '개인정보처리방침',
  },
  'legal.privacy.intro': {
    'zh-CN': '本隐私政策说明我们如何收集、使用和保护您的个人信息。使用本网站即表示您同意本政策。',
    en: 'This Privacy Policy explains how we collect, use, and protect your personal information. By using this website, you agree to this policy.',
    ja: '本プライバシーポリシーは、お客様の個人情報の収集、使用、保護について説明します。本ウェブサイトの利用をもって、本ポリシーに同意したものとみなします。',
    ko: '본 개인정보처리방침은 귀하의 개인정보를 어떻게 수집, 사용, 보호하는지 설명합니다. 본 웹사이트를 사용함으로써 본 방침에 동의하는 것입니다.',
  },
  'legal.privacy.collection.title': {
    'zh-CN': '信息收集',
    en: 'Information We Collect',
    ja: '収集する情報',
    ko: '수집하는 정보',
  },
  'legal.privacy.collection.content': {
    'zh-CN': '• Google OAuth 登录信息（姓名、邮箱、头像）\n• 占卜记录（卦象数据、问题、时间戳）\n• 本地存储数据（localStorage）\n• 使用 Cookie 提供广告服务（Google AdSense）',
    en: '• Google OAuth login information (name, email, avatar)\n• Divination records (hexagram data, questions, timestamps)\n• Local storage data (localStorage)\n• Cookies for advertising services (Google AdSense)',
    ja: '• Google OAuthログイン情報（氏名、メール、アバター）\n• 占い記録（卦象データ、質問、タイムスタンプ）\n• ローカルストレージデータ（localStorage）\n• 広告サービス用Cookie（Google AdSense）',
    ko: '• Google OAuth 로그인 정보 (이름, 이메일, 아바타)\n• 점괘 기록 (괘상 데이터, 질문, 타임스탬프)\n• 로컬 저장소 데이터 (localStorage)\n• 광고 서비스용 쿠키 (Google AdSense)',
  },
  'legal.privacy.usage.title': {
    'zh-CN': '信息使用',
    en: 'How We Use Your Information',
    ja: '情報の使用',
    ko: '정보 사용 방법',
  },
  'legal.privacy.usage.content': {
    'zh-CN': '• 提供占卜和卦象解析服务\n• 云端同步您的占卜记录\n• 通过 AI API 提供智能解卦\n• 展示相关广告（Google AdSense）',
    en: '• Provide divination and hexagram interpretation services\n• Sync your divination records to the cloud\n• Provide AI-powered interpretations via AI API\n• Display relevant advertisements (Google AdSense)',
    ja: '• 占いと卦象解析サービスの提供\n• 占い記録のクラウド同期\n• AI APIによる智能解卦\n• 関連広告の表示（Google AdSense）',
    ko: '• 점괘 및 괘상 해석 서비스 제공\n• 클라우드에 점괘 기록 동기화\n• AI API를 통한 지능형 해괘 제공\n• 관련 광고 표시 (Google AdSense)',
  },
  'legal.privacy.thirdparty.title': {
    'zh-CN': '第三方服务',
    en: 'Third-Party Services',
    ja: 'サードパーティサービス',
    ko: '제3자 서비스',
  },
  'legal.privacy.thirdparty.content': {
    'zh-CN': '我们使用以下第三方服务：\n• Google OAuth — 用户认证\n• Google AdSense — 广告服务\n• Cloudflare — 网站托管与 D1 数据库\n• AI API — 智能解卦服务\n\n这些服务有各自的隐私政策，建议您查阅。',
    en: 'We use the following third-party services:\n• Google OAuth — User authentication\n• Google AdSense — Advertising\n• Cloudflare — Hosting and D1 database\n• AI API — Intelligent interpretation\n\nThese services have their own privacy policies, which we recommend reviewing.',
    ja: '以下のサードパーティサービスを利用しています：\n• Google OAuth — ユーザー認証\n• Google AdSense — 広告サービス\n• Cloudflare — ホスティングとD1データベース\n• AI API — 智能解卦サービス\n\nこれらのサービスには各自のプライバシーポリシーがあります。',
    ko: '다음 제3자 서비스를 사용합니다:\n• Google OAuth — 사용자 인증\n• Google AdSense — 광고 서비스\n• Cloudflare — 호스팅 및 D1 데이터베이스\n• AI API — 지능형 해괘 서비스\n\n이러한 서비스에는 각자의 개인정보처리방침이 있습니다.',
  },
  'legal.privacy.rights.title': {
    'zh-CN': '您的权利',
    en: 'Your Rights',
    ja: 'お客様の権利',
    ko: '귀하의 권리',
  },
  'legal.privacy.rights.content': {
    'zh-CN': '• 您可以随时删除本地存储的占卜记录\n• 登录用户可以删除云端存储的记录\n• 您可以通过浏览器设置管理 Cookie\n• 如需删除账户数据，请联系我们',
    en: '• You can delete locally stored divination records at any time\n• Logged-in users can delete cloud-stored records\n• You can manage cookies through browser settings\n• Contact us to delete your account data',
    ja: '• ローカルの占い記録はいつでも削除できます\n• ログインユーザーはクラウド記録を削除できます\n• ブラウザ設定でCookieを管理できます\n• アカウントデータの削除はお問い合わせください',
    ko: '• 로컬 저장된 점괘 기록은 언제든지 삭제할 수 있습니다\n• 로그인 사용자는 클라우드 기록을 삭제할 수 있습니다\n• 브라우저 설정에서 쿠키를 관리할 수 있습니다\n• 계정 데이터 삭제는 문의해 주세요',
  },
  'legal.privacy.contact.title': {
    'zh-CN': '联系我们',
    en: 'Contact Us',
    ja: 'お問い合わせ',
    ko: '문의하기',
  },
  'legal.privacy.contact.content': {
    'zh-CN': '如果您对隐私政策有任何疑问，请通过 GitHub Issues 联系我们。',
    en: 'If you have any questions about this Privacy Policy, please contact us via GitHub Issues.',
    ja: 'プライバシーポリシーについてご質問がある場合は、GitHub Issuesからお問い合わせください。',
    ko: '개인정보처리방침에 대한 질문이 있으시면 GitHub Issues를 통해 문의해 주세요.',
  },

  // Terms of Service page
  'legal.terms.title': {
    'zh-CN': '服务条款',
    en: 'Terms of Service',
    ja: '利用規約',
    ko: '이용약관',
  },
  'legal.terms.intro': {
    'zh-CN': '使用本网站即表示您同意以下条款。如不同意，请停止使用。',
    en: 'By using this website, you agree to the following terms. If you do not agree, please stop using the service.',
    ja: '本ウェブサイトの利用をもって、以下の規約に同意したものとみなします。同意されない場合はご利用をお控えください。',
    ko: '본 웹사이트를 사용함으로써 다음 약관에 동의하는 것입니다. 동의하지 않으시면 사용을 중단해 주세요.',
  },
  'legal.terms.service.title': {
    'zh-CN': '服务说明',
    en: 'Service Description',
    ja: 'サービス説明',
    ko: '서비스 설명',
  },
  'legal.terms.service.content': {
    'zh-CN': '本网站提供基于传统六爻占卜方法的在线占卜服务，包括铜钱起卦、纳甲装卦、六亲六神分析及 AI 智能解卦。',
    en: 'This website provides online divination services based on traditional Liu Yao methods, including coin casting, Najia system analysis, Six Relations and Six Spirits interpretation, and AI-powered readings.',
    ja: '本ウェブサイトは、伝統的な六爻占いの方法に基づくオンライン占いサービスを提供します。銅銭起卦、納甲装卦、六親六神分析、AI智能解卦を含みます。',
    ko: '본 웹사이트는 전통 육효점 방법에 기반한 온라인 점괘 서비스를 제공하며, 동전 점괘, 납갑 시스템 분석, 육친육신 해석 및 AI 지능형 해괘를 포함합니다.',
  },
  'legal.terms.disclaimer.title': {
    'zh-CN': '娱乐免责声明',
    en: 'Entertainment Disclaimer',
    ja: '娯楽に関する免責事項',
    ko: '오락 면책 조항',
  },
  'legal.terms.disclaimer.content': {
    'zh-CN': '本网站提供的所有占卜结果和 AI 解读仅供娱乐和参考目的。占卜结果不构成医疗、法律、财务或其他专业建议。请勿依赖占卜结果做出重要的人生决定。如需专业建议，请咨询相关领域的专业人士。',
    en: 'All divination results and AI interpretations provided by this website are for entertainment and reference purposes only. They do not constitute medical, legal, financial, or other professional advice. Do not rely on divination results for important life decisions. For professional advice, please consult qualified professionals in the relevant field.',
    ja: '本ウェブサイトが提供するすべての占い結果とAI解読は、娯楽および参考目的のみです。医療、法律、財務、その他の専門的なアドバイスを構成するものではありません。占い結果に基づいて重要な人生の決定を下さないでください。専門的なアドバイスが必要な場合は、該当分野の専門家にご相談ください。',
    ko: '본 웹사이트에서 제공하는 모든 점괘 결과와 AI 해석은 오락 및 참고 목적으로만 제공됩니다. 의료, 법률, 재정 또는 기타 전문적인 조언을 구성하지 않습니다. 점괘 결과에 의존하여 중요한 인생 결정을 내리지 마세요. 전문적인 조언이 필요하면 해당 분야의 전문가에게 상담하세요.',
  },
  'legal.terms.user.title': {
    'zh-CN': '用户责任',
    en: 'User Responsibilities',
    ja: 'ユーザーの責任',
    ko: '사용자 책임',
  },
  'legal.terms.user.content': {
    'zh-CN': '• 您应合法使用本服务\n• 不得滥用或干扰服务运行\n• 您对账户活动承担责任\n• 不得将服务用于非法目的',
    en: '• You must use this service lawfully\n• Do not abuse or interfere with service operations\n• You are responsible for your account activity\n• Do not use the service for illegal purposes',
    ja: '• 本サービスを合法的に利用すること\n• サービスの運営を妨害しないこと\n• アカウントの活動に責任を持つこと\n• 違法な目的でサービスを利用しないこと',
    ko: '• 본 서비스를 합법적으로 사용해야 합니다\n• 서비스 운영을 방해하지 마세요\n• 계정 활동에 대한 책임은 귀하에게 있습니다\n• 불법적인 목적으로 서비스를 사용하지 마세요',
  },
  'legal.terms.ip.title': {
    'zh-CN': '知识产权',
    en: 'Intellectual Property',
    ja: '知的財産権',
    ko: '지적 재산권',
  },
  'legal.terms.ip.content': {
    'zh-CN': '本网站的设计、代码和内容受知识产权法保护。六十四卦卦辞、爻辞等传统文化内容属于公共领域。',
    en: 'The design, code, and content of this website are protected by intellectual property laws. Traditional cultural content such as hexagram texts and line texts are in the public domain.',
    ja: '本ウェブサイトのデザイン、コード、コンテンツは知的財産権法により保護されています。六十四卦の卦辞、爻辞などの伝統文化コンテンツはパブリックドメインです。',
    ko: '본 웹사이트의 디자인, 코드 및 콘텐츠는 지적 재산권법에 의해 보호됩니다. 64괘의 괘사, 효사 등 전통 문화 콘텐츠는 공공 영역에 속합니다.',
  },
  'legal.terms.liability.title': {
    'zh-CN': '责任限制',
    en: 'Limitation of Liability',
    ja: '責任の制限',
    ko: '책임 제한',
  },
  'legal.terms.liability.content': {
    'zh-CN': '本网站按"现状"提供服务，不做任何明示或暗示的保证。我们不对因使用本服务而产生的任何直接或间接损失承担责任。',
    en: 'This website provides services "as is" without any express or implied warranties. We are not liable for any direct or indirect damages arising from the use of this service.',
    ja: '本ウェブサイトは「現状のまま」でサービスを提供し、明示的または黙示的な保証は行いません。本サービスの利用により生じたいかなる直接的または間接的損害についても責任を負いません。',
    ko: '본 웹사이트는 명시적 또는 묵시적 보증 없이 "있는 그대로" 서비스를 제공합니다. 본 서비스 사용으로 인한 직접적 또는 간접적 손해에 대해 책임지지 않습니다.',
  },
};

export function getTranslation(key: string, locale: Locale): string {
  const entry = translations[key];
  if (!entry) return key;
  return entry[locale] || entry['zh-CN'] || key;
}

export function getTranslationPair(key: string, locale: Locale): { zh: string; translated?: string } {
  const entry = translations[key];
  if (!entry) return { zh: key };
  const zh = entry['zh-CN'] || key;
  if (locale === 'zh-CN') {
    return { zh };
  }
  const translated = entry[locale];
  return { zh, translated: translated || undefined };
}
