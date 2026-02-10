#!/usr/bin/env node
// 六十四卦完整数据生成脚本
const fs = require('fs');

// 八卦 binary (从下到上，初爻到上爻)
const trigramBinary = {
  '乾': '111', '兑': '110', '离': '101', '震': '100',
  '巽': '011', '坎': '010', '艮': '001', '坤': '000'
};
const trigramNature = {
  '乾': '天', '兑': '泽', '离': '火', '震': '雷',
  '巽': '风', '坎': '水', '艮': '山', '坤': '地'
};

// 64卦: [name, upper, lower]
const hexList = [
  ['乾','乾','乾'],['坤','坤','坤'],['屯','坎','震'],['蒙','艮','坎'],
  ['需','坎','乾'],['讼','乾','坎'],['师','坤','坎'],['比','坎','坤'],
  ['小畜','巽','乾'],['履','乾','兑'],['泰','坤','乾'],['否','乾','坤'],
  ['同人','乾','离'],['大有','离','乾'],['谦','坤','艮'],['豫','震','坤'],
  ['随','兑','震'],['蛊','艮','巽'],['临','坤','兑'],['观','巽','坤'],
  ['噬嗑','离','震'],['贲','艮','离'],['剥','艮','坤'],['复','坤','震'],
  ['无妄','乾','震'],['大畜','艮','乾'],['颐','艮','震'],['大过','兑','巽'],
  ['坎','坎','坎'],['离','离','离'],['咸','兑','艮'],['恒','震','巽'],
  ['遁','乾','艮'],['大壮','震','乾'],['晋','离','坤'],['明夷','坤','离'],
  ['家人','巽','离'],['睽','离','兑'],['蹇','坎','艮'],['解','震','坎'],
  ['损','艮','兑'],['益','巽','震'],['夬','兑','乾'],['姤','乾','巽'],
  ['萃','兑','坤'],['升','坤','巽'],['困','兑','坎'],['井','坎','巽'],
  ['革','兑','离'],['鼎','离','巽'],['震','震','震'],['艮','艮','艮'],
  ['渐','巽','艮'],['归妹','震','兑'],['丰','震','离'],['旅','离','艮'],
  ['巽','巽','巽'],['兑','兑','兑'],['涣','巽','坎'],['节','坎','兑'],
  ['中孚','巽','兑'],['小过','震','艮'],['既济','坎','离'],['未济','离','坎']
];

const fullNames = [
  '乾为天','坤为地','水雷屯','山水蒙','水天需','天水讼','地水师','水地比',
  '风天小畜','天泽履','地天泰','天地否','天火同人','火天大有','地山谦','雷地豫',
  '泽雷随','山风蛊','地泽临','风地观','火雷噬嗑','山火贲','山地剥','地雷复',
  '天雷无妄','山天大畜','山雷颐','泽风大过','坎为水','离为火','泽山咸','雷风恒',
  '天山遁','雷天大壮','火地晋','地火明夷','风火家人','火泽睽','水山蹇','雷水解',
  '山泽损','风雷益','泽天夬','天风姤','泽地萃','地风升','泽水困','水风井',
  '泽火革','火风鼎','震为雷','艮为山','风山渐','雷泽归妹','雷火丰','火山旅',
  '巽为风','兑为泽','风水涣','水泽节','风泽中孚','雷山小过','水火既济','火水未济'
];

const summaries = [
  '刚健中正，自强不息','厚德载物，顺势而行','万事开头难，坚持则亨通','启蒙教育，循序渐进',
  '等待时机，蓄势待发','争讼之事，宜和解退让','统率众人，纪律严明','亲近辅佐，团结互助',
  '小有积蓄，以柔畜刚','谨慎行事，如履薄冰','天地交泰，万物通达','天地不交，闭塞不通',
  '志同道合，和衷共济','大有收获，光明正大','谦虚谨慎，功成不居','和乐豫悦，顺时而动',
  '随顺时势，灵活应变','整治积弊，拨乱反正','居上临下，教化万民','观察审视，以德服人',
  '明罚敕法，刑狱之象','文饰外表，质朴为本','剥落衰败，顺势而止','一阳来复，生机再现',
  '无妄之行，顺应天理','大有积蓄，厚积薄发','颐养正道，慎言节食','大过之时，独立不惧',
  '重重险难，守正待时','光明附丽，柔顺中正','感应相通，男女交感','恒久不变，持之以恒',
  '退避隐遁，明哲保身','壮盛强大，守正防过','光明上进，晋升有望','光明受损，韬光养晦',
  '家道正则天下定','乖违背离，求同存异','行路艰难，宜静不宜动','解除困难，宜早行动',
  '减损下益上，诚心奉献','损上益下，利民兴业','果决刚毅，以正胜邪','不期而遇，柔遇刚时',
  '聚集汇合，顺天应人','积小成大，步步上升','困境中守正，待时而动','井养不穷，修德济民',
  '变革更新，顺天应人','鼎新革故，养贤用能','震动警惧，修省自新','止而又止，知止则安',
  '循序渐进，水滴石穿','少女出嫁，守正防凶','丰盛盈满，宜照四方','旅途在外，谨慎柔顺',
  '谦逊随顺，无往不利','喜悦和乐，利于正固','涣散离散，宜聚不宜散','节制有度，苦节不可',
  '诚信感人，中心信实','小有过越，宜下不宜上','万事已成，守成防衰','事未完成，谨慎渡终'
];

// 加载详细数据（后面定义）
const details = [];

// ===== 卦1: 乾 =====
details.push({
  judgment: "元亨，利贞。",
  image: "天行健，君子以自强不息。",
  lines: [
    {position:"初九",text:"潜龙勿用。"},
    {position:"九二",text:"见龙在田，利见大人。"},
    {position:"九三",text:"君子终日乾乾，夕惕若厉，无咎。"},
    {position:"九四",text:"或跃在渊，无咎。"},
    {position:"九五",text:"飞龙在天，利见大人。"},
    {position:"上九",text:"亢龙有悔。"}
  ]
});
// ===== 卦2: 坤 =====
details.push({
  judgment: "元亨，利牝马之贞。君子有攸往，先迷后得主，利。西南得朋，东北丧朋。安贞吉。",
  image: "地势坤，君子以厚德载物。",
  lines: [
    {position:"初六",text:"履霜，坚冰至。"},
    {position:"六二",text:"直方大，不习无不利。"},
    {position:"六三",text:"含章可贞，或从王事，无成有终。"},
    {position:"六四",text:"括囊，无咎无誉。"},
    {position:"六五",text:"黄裳，元吉。"},
    {position:"上六",text:"龙战于野，其血玄黄。"}
  ]
});
// ===== 卦3: 屯 =====
details.push({
  judgment: "元亨，利贞。勿用有攸往，利建侯。",
  image: "云雷屯，君子以经纶。",
  lines: [
    {position:"初九",text:"磐桓，利居贞，利建侯。"},
    {position:"六二",text:"屯如邅如，乘马班如。匪寇婚媾，女子贞不字，十年乃字。"},
    {position:"六三",text:"即鹿无虞，惟入于林中，君子几不如舍，往吝。"},
    {position:"六四",text:"乘马班如，求婚媾，往吉，无不利。"},
    {position:"九五",text:"屯其膏，小贞吉，大贞凶。"},
    {position:"上六",text:"乘马班如，泣血涟如。"}
  ]
});
// ===== 卦4: 蒙 =====
details.push({
  judgment: "亨。匪我求童蒙，童蒙求我。初筮告，再三渎，渎则不告。利贞。",
  image: "山下出泉，蒙。君子以果行育德。",
  lines: [
    {position:"初六",text:"发蒙，利用刑人，用说桎梏，以往吝。"},
    {position:"九二",text:"包蒙吉，纳妇吉，子克家。"},
    {position:"六三",text:"勿用取女，见金夫，不有躬，无攸利。"},
    {position:"六四",text:"困蒙，吝。"},
    {position:"六五",text:"童蒙，吉。"},
    {position:"上九",text:"击蒙，不利为寇，利御寇。"}
  ]
});
// ===== 卦5: 需 =====
details.push({
  judgment: "有孚，光亨，贞吉。利涉大川。",
  image: "云上于天，需。君子以饮食宴乐。",
  lines: [
    {position:"初九",text:"需于郊，利用恒，无咎。"},
    {position:"九二",text:"需于沙，小有言，终吉。"},
    {position:"九三",text:"需于泥，致寇至。"},
    {position:"六四",text:"需于血，出自穴。"},
    {position:"九五",text:"需于酒食，贞吉。"},
    {position:"上六",text:"入于穴，有不速之客三人来，敬之终吉。"}
  ]
});
// ===== 卦6: 讼 =====
details.push({
  judgment: "有孚窒惕，中吉，终凶。利见大人，不利涉大川。",
  image: "天与水违行，讼。君子以作事谋始。",
  lines: [
    {position:"初六",text:"不永所事，小有言，终吉。"},
    {position:"九二",text:"不克讼，归而逋，其邑人三百户，无眚。"},
    {position:"六三",text:"食旧德，贞厉，终吉。或从王事，无成。"},
    {position:"九四",text:"不克讼，复即命，渝安贞，吉。"},
    {position:"九五",text:"讼，元吉。"},
    {position:"上九",text:"或锡之鞶带，终朝三褫之。"}
  ]
});
// ===== 卦7: 师 =====
details.push({
  judgment: "贞，丈人吉，无咎。",
  image: "地中有水，师。君子以容民畜众。",
  lines: [
    {position:"初六",text:"师出以律，否臧凶。"},
    {position:"九二",text:"在师中吉，无咎，王三锡命。"},
    {position:"六三",text:"师或舆尸，凶。"},
    {position:"六四",text:"师左次，无咎。"},
    {position:"六五",text:"田有禽，利执言，无咎。长子帅师，弟子舆尸，贞凶。"},
    {position:"上六",text:"大君有命，开国承家，小人勿用。"}
  ]
});
// ===== 卦8: 比 =====
details.push({
  judgment: "吉。原筮元永贞，无咎。不宁方来，后夫凶。",
  image: "地上有水，比。先王以建万国，亲诸侯。",
  lines: [
    {position:"初六",text:"有孚比之，无咎。有孚盈缶，终来有它，吉。"},
    {position:"六二",text:"比之自内，贞吉。"},
    {position:"六三",text:"比之匪人。"},
    {position:"六四",text:"外比之，贞吉。"},
    {position:"九五",text:"显比，王用三驱，失前禽，邑人不诫，吉。"},
    {position:"上六",text:"比之无首，凶。"}
  ]
});
// ===== 卦9: 小畜 =====
details.push({
  judgment: "亨。密云不雨，自我西郊。",
  image: "风行天上，小畜。君子以懿文德。",
  lines: [
    {position:"初九",text:"复自道，何其咎，吉。"},
    {position:"九二",text:"牵复，吉。"},
    {position:"九三",text:"舆说辐，夫妻反目。"},
    {position:"六四",text:"有孚，血去惕出，无咎。"},
    {position:"九五",text:"有孚挛如，富以其邻。"},
    {position:"上九",text:"既雨既处，尚德载，妇贞厉。月几望，君子征凶。"}
  ]
});
// ===== 卦10: 履 =====
details.push({
  judgment: "履虎尾，不咥人，亨。",
  image: "上天下泽，履。君子以辩上下，定民志。",
  lines: [
    {position:"初九",text:"素履往，无咎。"},
    {position:"九二",text:"履道坦坦，幽人贞吉。"},
    {position:"六三",text:"眇能视，跛能履，履虎尾，咥人，凶。武人为于大君。"},
    {position:"九四",text:"履虎尾，愬愬终吉。"},
    {position:"九五",text:"夬履，贞厉。"},
    {position:"上九",text:"视履考祥，其旋元吉。"}
  ]
});
// ===== 卦11: 泰 =====
details.push({
  judgment: "小往大来，吉亨。",
  image: "天地交，泰。后以财成天地之道，辅相天地之宜，以左右民。",
  lines: [
    {position:"初九",text:"拔茅茹，以其汇，征吉。"},
    {position:"九二",text:"包荒，用冯河，不遐遗，朋亡，得尚于中行。"},
    {position:"九三",text:"无平不陂，无往不复。艰贞无咎，勿恤其孚，于食有福。"},
    {position:"六四",text:"翩翩不富，以其邻，不戒以孚。"},
    {position:"六五",text:"帝乙归妹，以祉元吉。"},
    {position:"上六",text:"城复于隍，勿用师。自邑告命，贞吝。"}
  ]
});
// ===== 卦12: 否 =====
details.push({
  judgment: "否之匪人，不利君子贞，大往小来。",
  image: "天地不交，否。君子以俭德辟难，不可荣以禄。",
  lines: [
    {position:"初六",text:"拔茅茹，以其汇，贞吉亨。"},
    {position:"六二",text:"包承，小人吉，大人否亨。"},
    {position:"六三",text:"包羞。"},
    {position:"九四",text:"有命无咎，畴离祉。"},
    {position:"九五",text:"休否，大人吉。其亡其亡，系于苞桑。"},
    {position:"上九",text:"倾否，先否后喜。"}
  ]
});
// ===== 卦13: 同人 =====
details.push({
  judgment: "同人于野，亨。利涉大川，利君子贞。",
  image: "天与火，同人。君子以类族辨物。",
  lines: [
    {position:"初九",text:"同人于门，无咎。"},
    {position:"六二",text:"同人于宗，吝。"},
    {position:"九三",text:"伏戎于莽，升其高陵，三岁不兴。"},
    {position:"九四",text:"乘其墉，弗克攻，吉。"},
    {position:"九五",text:"同人先号咷而后笑，大师克相遇。"},
    {position:"上九",text:"同人于郊，无悔。"}
  ]
});
// ===== 卦14: 大有 =====
details.push({
  judgment: "元亨。",
  image: "火在天上，大有。君子以遏恶扬善，顺天休命。",
  lines: [
    {position:"初九",text:"无交害，匪咎，艰则无咎。"},
    {position:"九二",text:"大车以载，有攸往，无咎。"},
    {position:"九三",text:"公用亨于天子，小人弗克。"},
    {position:"九四",text:"匪其彭，无咎。"},
    {position:"六五",text:"厥孚交如，威如，吉。"},
    {position:"上九",text:"自天祐之，吉无不利。"}
  ]
});
// ===== 卦15: 谦 =====
details.push({
  judgment: "亨，君子有终。",
  image: "地中有山，谦。君子以裒多益寡，称物平施。",
  lines: [
    {position:"初六",text:"谦谦君子，用涉大川，吉。"},
    {position:"六二",text:"鸣谦，贞吉。"},
    {position:"九三",text:"劳谦，君子有终，吉。"},
    {position:"六四",text:"无不利，撝谦。"},
    {position:"六五",text:"不富以其邻，利用侵伐，无不利。"},
    {position:"上六",text:"鸣谦，利用行师，征邑国。"}
  ]
});
// ===== 卦16: 豫 =====
details.push({
  judgment: "利建侯行师。",
  image: "雷出地奋，豫。先王以作乐崇德，殷荐之上帝，以配祖考。",
  lines: [
    {position:"初六",text:"鸣豫，凶。"},
    {position:"六二",text:"介于石，不终日，贞吉。"},
    {position:"六三",text:"盱豫，悔。迟有悔。"},
    {position:"九四",text:"由豫，大有得。勿疑，朋盍簪。"},
    {position:"六五",text:"贞疾，恒不死。"},
    {position:"上六",text:"冥豫，成有渝，无咎。"}
  ]
});
// ===== 卦17: 随 =====
details.push({
  judgment: "元亨利贞，无咎。",
  image: "泽中有雷，随。君子以向晦入宴息。",
  lines: [
    {position:"初九",text:"官有渝，贞吉。出门交有功。"},
    {position:"六二",text:"系小子，失丈夫。"},
    {position:"六三",text:"系丈夫，失小子。随有求得，利居贞。"},
    {position:"九四",text:"随有获，贞凶。有孚在道，以明，何咎。"},
    {position:"九五",text:"孚于嘉，吉。"},
    {position:"上六",text:"拘系之，乃从维之。王用亨于西山。"}
  ]
});
// ===== 卦18: 蛊 =====
details.push({
  judgment: "元亨，利涉大川。先甲三日，后甲三日。",
  image: "山下有风，蛊。君子以振民育德。",
  lines: [
    {position:"初六",text:"干父之蛊，有子，考无咎，厉终吉。"},
    {position:"九二",text:"干母之蛊，不可贞。"},
    {position:"九三",text:"干父之蛊，小有悔，无大咎。"},
    {position:"六四",text:"裕父之蛊，往见吝。"},
    {position:"六五",text:"干父之蛊，用誉。"},
    {position:"上九",text:"不事王侯，高尚其事。"}
  ]
});
// ===== 卦19: 临 =====
details.push({
  judgment: "元亨利贞。至于八月有凶。",
  image: "泽上有地，临。君子以教思无穷，容保民无疆。",
  lines: [
    {position:"初九",text:"咸临，贞吉。"},
    {position:"九二",text:"咸临，吉无不利。"},
    {position:"六三",text:"甘临，无攸利。既忧之，无咎。"},
    {position:"六四",text:"至临，无咎。"},
    {position:"六五",text:"知临，大君之宜，吉。"},
    {position:"上六",text:"敦临，吉，无咎。"}
  ]
});
// ===== 卦20: 观 =====
details.push({
  judgment: "盥而不荐，有孚颙若。",
  image: "风行地上，观。先王以省方观民设教。",
  lines: [
    {position:"初六",text:"童观，小人无咎，君子吝。"},
    {position:"六二",text:"窥观，利女贞。"},
    {position:"六三",text:"观我生，进退。"},
    {position:"六四",text:"观国之光，利用宾于王。"},
    {position:"九五",text:"观我生，君子无咎。"},
    {position:"上九",text:"观其生，君子无咎。"}
  ]
});
// ===== 卦21: 噬嗑 =====
details.push({
  judgment: "亨。利用狱。",
  image: "雷电噬嗑，先王以明罚敕法。",
  lines: [
    {position:"初九",text:"屦校灭趾，无咎。"},
    {position:"六二",text:"噬肤灭鼻，无咎。"},
    {position:"六三",text:"噬腊肉，遇毒，小吝，无咎。"},
    {position:"九四",text:"噬干胏，得金矢，利艰贞，吉。"},
    {position:"六五",text:"噬干肉，得黄金，贞厉，无咎。"},
    {position:"上九",text:"何校灭耳，凶。"}
  ]
});
// ===== 卦22: 贲 =====
details.push({
  judgment: "亨。小利有攸往。",
  image: "山下有火，贲。君子以明庶政，无敢折狱。",
  lines: [
    {position:"初九",text:"贲其趾，舍车而徒。"},
    {position:"六二",text:"贲其须。"},
    {position:"九三",text:"贲如濡如，永贞吉。"},
    {position:"六四",text:"贲如皤如，白马翰如，匪寇婚媾。"},
    {position:"六五",text:"贲于丘园，束帛戋戋，吝，终吉。"},
    {position:"上九",text:"白贲，无咎。"}
  ]
});
// ===== 卦23: 剥 =====
details.push({
  judgment: "不利有攸往。",
  image: "山附于地，剥。上以厚下安宅。",
  lines: [
    {position:"初六",text:"剥床以足，蔑贞凶。"},
    {position:"六二",text:"剥床以辨，蔑贞凶。"},
    {position:"六三",text:"剥之，无咎。"},
    {position:"六四",text:"剥床以肤，凶。"},
    {position:"六五",text:"贯鱼，以宫人宠，无不利。"},
    {position:"上九",text:"硕果不食，君子得舆，小人剥庐。"}
  ]
});
// ===== 卦24: 复 =====
details.push({
  judgment: "亨。出入无疾，朋来无咎。反复其道，七日来复，利有攸往。",
  image: "雷在地中，复。先王以至日闭关，商旅不行，后不省方。",
  lines: [
    {position:"初九",text:"不远复，无祗悔，元吉。"},
    {position:"六二",text:"休复，吉。"},
    {position:"六三",text:"频复，厉无咎。"},
    {position:"六四",text:"中行独复。"},
    {position:"六五",text:"敦复，无悔。"},
    {position:"上六",text:"迷复，凶，有灾眚。用行师，终有大败，以其国君凶，至于十年不克征。"}
  ]
});
// ===== 卦25: 无妄 =====
details.push({
  judgment: "元亨利贞。其匪正有眚，不利有攸往。",
  image: "天下雷行，物与无妄。先王以茂对时育万物。",
  lines: [
    {position:"初九",text:"无妄，往吉。"},
    {position:"六二",text:"不耕获，不菑畲，则利有攸往。"},
    {position:"六三",text:"无妄之灾，或系之牛，行人之得，邑人之灾。"},
    {position:"九四",text:"可贞，无咎。"},
    {position:"九五",text:"无妄之疾，勿药有喜。"},
    {position:"上九",text:"无妄，行有眚，无攸利。"}
  ]
});
// ===== 卦26: 大畜 =====
details.push({
  judgment: "利贞，不家食吉，利涉大川。",
  image: "天在山中，大畜。君子以多识前言往行，以畜其德。",
  lines: [
    {position:"初九",text:"有厉，利已。"},
    {position:"九二",text:"舆说辐。"},
    {position:"九三",text:"良马逐，利艰贞。曰闲舆卫，利有攸往。"},
    {position:"六四",text:"童牛之牿，元吉。"},
    {position:"六五",text:"豮豕之牙，吉。"},
    {position:"上九",text:"何天之衢，亨。"}
  ]
});
// ===== 卦27: 颐 =====
details.push({
  judgment: "贞吉。观颐，自求口实。",
  image: "山下有雷，颐。君子以慎言语，节饮食。",
  lines: [
    {position:"初九",text:"舍尔灵龟，观我朵颐，凶。"},
    {position:"六二",text:"颠颐，拂经，于丘颐，征凶。"},
    {position:"六三",text:"拂颐，贞凶，十年勿用，无攸利。"},
    {position:"六四",text:"颠颐吉，虎视眈眈，其欲逐逐，无咎。"},
    {position:"六五",text:"拂经，居贞吉，不可涉大川。"},
    {position:"上九",text:"由颐，厉吉，利涉大川。"}
  ]
});
// ===== 卦28: 大过 =====
details.push({
  judgment: "栋桡，利有攸往，亨。",
  image: "泽灭木，大过。君子以独立不惧，遁世无闷。",
  lines: [
    {position:"初六",text:"藉用白茅，无咎。"},
    {position:"九二",text:"枯杨生稊，老夫得其女妻，无不利。"},
    {position:"九三",text:"栋桡，凶。"},
    {position:"九四",text:"栋隆，吉。有它吝。"},
    {position:"九五",text:"枯杨生华，老妇得其士夫，无咎无誉。"},
    {position:"上六",text:"过涉灭顶，凶，无咎。"}
  ]
});
// ===== 卦29: 坎 =====
details.push({
  judgment: "习坎，有孚，维心亨，行有尚。",
  image: "水洊至，习坎。君子以常德行，习教事。",
  lines: [
    {position:"初六",text:"习坎，入于坎窞，凶。"},
    {position:"九二",text:"坎有险，求小得。"},
    {position:"六三",text:"来之坎坎，险且枕，入于坎窞，勿用。"},
    {position:"六四",text:"樽酒簋贰，用缶，纳约自牖，终无咎。"},
    {position:"九五",text:"坎不盈，祗既平，无咎。"},
    {position:"上六",text:"系用徽纆，寘于丛棘，三岁不得，凶。"}
  ]
});
// ===== 卦30: 离 =====
details.push({
  judgment: "利贞，亨。畜牝牛，吉。",
  image: "明两作，离。大人以继明照于四方。",
  lines: [
    {position:"初九",text:"履错然，敬之无咎。"},
    {position:"六二",text:"黄离，元吉。"},
    {position:"九三",text:"日昃之离，不鼓缶而歌，则大耋之嗟，凶。"},
    {position:"九四",text:"突如其来如，焚如，死如，弃如。"},
    {position:"六五",text:"出涕沱若，戚嗟若，吉。"},
    {position:"上九",text:"王用出征，有嘉折首，获匪其丑，无咎。"}
  ]
});
// ===== 卦31: 咸 =====
details.push({
  judgment: "亨，利贞，取女吉。",
  image: "山上有泽，咸。君子以虚受人。",
  lines: [
    {position:"初六",text:"咸其拇。"},
    {position:"六二",text:"咸其腓，凶，居吉。"},
    {position:"九三",text:"咸其股，执其随，往吝。"},
    {position:"九四",text:"贞吉悔亡，憧憧往来，朋从尔思。"},
    {position:"九五",text:"咸其脢，无悔。"},
    {position:"上六",text:"咸其辅颊舌。"}
  ]
});
// ===== 卦32: 恒 =====
details.push({
  judgment: "亨，无咎，利贞，利有攸往。",
  image: "雷风，恒。君子以立不易方。",
  lines: [
    {position:"初六",text:"浚恒，贞凶，无攸利。"},
    {position:"九二",text:"悔亡。"},
    {position:"九三",text:"不恒其德，或承之羞，贞吝。"},
    {position:"九四",text:"田无禽。"},
    {position:"六五",text:"恒其德，贞，妇人吉，夫子凶。"},
    {position:"上六",text:"振恒，凶。"}
  ]
});
// ===== 卦33: 遁 =====
details.push({
  judgment: "亨，小利贞。",
  image: "天下有山，遁。君子以远小人，不恶而严。",
  lines: [
    {position:"初六",text:"遁尾，厉，勿用有攸往。"},
    {position:"六二",text:"执之用黄牛之革，莫之胜说。"},
    {position:"九三",text:"系遁，有疾厉，畜臣妾吉。"},
    {position:"九四",text:"好遁，君子吉，小人否。"},
    {position:"九五",text:"嘉遁，贞吉。"},
    {position:"上九",text:"肥遁，无不利。"}
  ]
});
// ===== 卦34: 大壮 =====
details.push({
  judgment: "利贞。",
  image: "雷在天上，大壮。君子以非礼弗履。",
  lines: [
    {position:"初九",text:"壮于趾，征凶，有孚。"},
    {position:"九二",text:"贞吉。"},
    {position:"九三",text:"小人用壮，君子用罔，贞厉。羝羊触藩，羸其角。"},
    {position:"九四",text:"贞吉悔亡，藩决不羸，壮于大舆之輹。"},
    {position:"六五",text:"丧羊于易，无悔。"},
    {position:"上六",text:"羝羊触藩，不能退，不能遂，无攸利，艰则吉。"}
  ]
});
// ===== 卦35: 晋 =====
details.push({
  judgment: "康侯用锡马蕃庶，昼日三接。",
  image: "明出地上，晋。君子以自昭明德。",
  lines: [
    {position:"初六",text:"晋如摧如，贞吉。罔孚，裕无咎。"},
    {position:"六二",text:"晋如愁如，贞吉。受兹介福，于其王母。"},
    {position:"六三",text:"众允，悔亡。"},
    {position:"九四",text:"晋如鼫鼠，贞厉。"},
    {position:"六五",text:"悔亡，失得勿恤，往吉，无不利。"},
    {position:"上九",text:"晋其角，维用伐邑，厉吉无咎，贞吝。"}
  ]
});
// ===== 卦36: 明夷 =====
details.push({
  judgment: "利艰贞。",
  image: "明入地中，明夷。君子以莅众，用晦而明。",
  lines: [
    {position:"初九",text:"明夷于飞，垂其翼。君子于行，三日不食，有攸往，主人有言。"},
    {position:"六二",text:"明夷，夷于左股，用拯马壮，吉。"},
    {position:"九三",text:"明夷于南狩，得其大首，不可疾贞。"},
    {position:"六四",text:"入于左腹，获明夷之心，于出门庭。"},
    {position:"六五",text:"箕子之明夷，利贞。"},
    {position:"上六",text:"不明晦，初登于天，后入于地。"}
  ]
});
// ===== 卦37: 家人 =====
details.push({
  judgment: "利女贞。",
  image: "风自火出，家人。君子以言有物而行有恒。",
  lines: [
    {position:"初九",text:"闲有家，悔亡。"},
    {position:"六二",text:"无攸遂，在中馈，贞吉。"},
    {position:"九三",text:"家人嗃嗃，悔厉吉。妇子嘻嘻，终吝。"},
    {position:"六四",text:"富家，大吉。"},
    {position:"九五",text:"王假有家，勿恤吉。"},
    {position:"上九",text:"有孚威如，终吉。"}
  ]
});
// ===== 卦38: 睽 =====
details.push({
  judgment: "小事吉。",
  image: "上火下泽，睽。君子以同而异。",
  lines: [
    {position:"初九",text:"悔亡，丧马勿逐，自复。见恶人无咎。"},
    {position:"九二",text:"遇主于巷，无咎。"},
    {position:"六三",text:"见舆曳，其牛掣，其人天且劓，无初有终。"},
    {position:"九四",text:"睽孤，遇元夫，交孚，厉无咎。"},
    {position:"六五",text:"悔亡，厥宗噬肤，往何咎。"},
    {position:"上九",text:"睽孤，见豕负涂，载鬼一车，先张之弧，后说之弧，匪寇婚媾，往遇雨则吉。"}
  ]
});
// ===== 卦39: 蹇 =====
details.push({
  judgment: "利西南，不利东北。利见大人，贞吉。",
  image: "山上有水，蹇。君子以反身修德。",
  lines: [
    {position:"初六",text:"往蹇，来誉。"},
    {position:"六二",text:"王臣蹇蹇，匪躬之故。"},
    {position:"九三",text:"往蹇来反。"},
    {position:"六四",text:"往蹇来连。"},
    {position:"九五",text:"大蹇朋来。"},
    {position:"上六",text:"往蹇来硕，吉。利见大人。"}
  ]
});
// ===== 卦40: 解 =====
details.push({
  judgment: "利西南，无所往，其来复吉。有攸往，夙吉。",
  image: "雷雨作，解。君子以赦过宥罪。",
  lines: [
    {position:"初六",text:"无咎。"},
    {position:"九二",text:"田获三狐，得黄矢，贞吉。"},
    {position:"六三",text:"负且乘，致寇至，贞吝。"},
    {position:"九四",text:"解而拇，朋至斯孚。"},
    {position:"六五",text:"君子维有解，吉。有孚于小人。"},
    {position:"上六",text:"公用射隼于高墉之上，获之，无不利。"}
  ]
});
// ===== 卦41: 损 =====
details.push({
  judgment: "有孚，元吉，无咎，可贞，利有攸往。曷之用，二簋可用享。",
  image: "山下有泽，损。君子以惩忿窒欲。",
  lines: [
    {position:"初九",text:"已事遄往，无咎，酌损之。"},
    {position:"九二",text:"利贞，征凶，弗损益之。"},
    {position:"六三",text:"三人行则损一人，一人行则得其友。"},
    {position:"六四",text:"损其疾，使遄有喜，无咎。"},
    {position:"六五",text:"或益之十朋之龟，弗克违，元吉。"},
    {position:"上九",text:"弗损益之，无咎，贞吉，利有攸往，得臣无家。"}
  ]
});
// ===== 卦42: 益 =====
details.push({
  judgment: "利有攸往，利涉大川。",
  image: "风雷，益。君子以见善则迁，有过则改。",
  lines: [
    {position:"初九",text:"利用为大作，元吉，无咎。"},
    {position:"六二",text:"或益之十朋之龟，弗克违，永贞吉。王用享于帝，吉。"},
    {position:"六三",text:"益之用凶事，无咎。有孚中行，告公用圭。"},
    {position:"六四",text:"中行，告公从，利用为依迁国。"},
    {position:"九五",text:"有孚惠心，勿问元吉。有孚惠我德。"},
    {position:"上九",text:"莫益之，或击之，立心勿恒，凶。"}
  ]
});
// ===== 卦43: 夬 =====
details.push({
  judgment: "扬于王庭，孚号，有厉，告自邑，不利即戎，利有攸往。",
  image: "泽上于天，夬。君子以施禄及下，居德则忌。",
  lines: [
    {position:"初九",text:"壮于前趾，往不胜为咎。"},
    {position:"九二",text:"惕号，莫夜有戎，勿恤。"},
    {position:"九三",text:"壮于頄，有凶。君子夬夬，独行遇雨，若濡有愠，无咎。"},
    {position:"九四",text:"臀无肤，其行次且。牵羊悔亡，闻言不信。"},
    {position:"九五",text:"苋陆夬夬，中行无咎。"},
    {position:"上六",text:"无号，终有凶。"}
  ]
});
// ===== 卦44: 姤 =====
details.push({
  judgment: "女壮，勿用取女。",
  image: "天下有风，姤。后以施命诰四方。",
  lines: [
    {position:"初六",text:"系于金柅，贞吉，有攸往，见凶，羸豕孚蹢躅。"},
    {position:"九二",text:"包有鱼，无咎，不利宾。"},
    {position:"九三",text:"臀无肤，其行次且，厉，无大咎。"},
    {position:"九四",text:"包无鱼，起凶。"},
    {position:"九五",text:"以杞包瓜，含章，有陨自天。"},
    {position:"上九",text:"姤其角，吝，无咎。"}
  ]
});
// ===== 卦45: 萃 =====
details.push({
  judgment: "亨。王假有庙，利见大人，亨，利贞。用大牲吉，利有攸往。",
  image: "泽上于地，萃。君子以除戎器，戒不虞。",
  lines: [
    {position:"初六",text:"有孚不终，乃乱乃萃，若号一握为笑，勿恤，往无咎。"},
    {position:"六二",text:"引吉，无咎，孚乃利用禴。"},
    {position:"六三",text:"萃如嗟如，无攸利，往无咎，小吝。"},
    {position:"九四",text:"大吉，无咎。"},
    {position:"九五",text:"萃有位，无咎。匪孚，元永贞，悔亡。"},
    {position:"上六",text:"赍咨涕洟，无咎。"}
  ]
});
// ===== 卦46: 升 =====
details.push({
  judgment: "元亨，用见大人，勿恤，南征吉。",
  image: "地中生木，升。君子以顺德，积小以高大。",
  lines: [
    {position:"初六",text:"允升，大吉。"},
    {position:"九二",text:"孚乃利用禴，无咎。"},
    {position:"九三",text:"升虚邑。"},
    {position:"六四",text:"王用亨于岐山，吉，无咎。"},
    {position:"六五",text:"贞吉，升阶。"},
    {position:"上六",text:"冥升，利于不息之贞。"}
  ]
});
// ===== 卦47: 困 =====
details.push({
  judgment: "亨，贞，大人吉，无咎，有言不信。",
  image: "泽无水，困。君子以致命遂志。",
  lines: [
    {position:"初六",text:"臀困于株木，入于幽谷，三岁不觌。"},
    {position:"九二",text:"困于酒食，朱绂方来，利用享祀，征凶，无咎。"},
    {position:"六三",text:"困于石，据于蒺藜，入于其宫，不见其妻，凶。"},
    {position:"九四",text:"来徐徐，困于金车，吝，有终。"},
    {position:"九五",text:"劓刖，困于赤绂，乃徐有说，利用祭祀。"},
    {position:"上六",text:"困于葛藟，于臲卼，曰动悔。有悔，征吉。"}
  ]
});
// ===== 卦48: 井 =====
details.push({
  judgment: "改邑不改井，无丧无得，往来井井。汔至，亦未繘井，羸其瓶，凶。",
  image: "木上有水，井。君子以劳民劝相。",
  lines: [
    {position:"初六",text:"井泥不食，旧井无禽。"},
    {position:"九二",text:"井谷射鲋，瓮敝漏。"},
    {position:"九三",text:"井渫不食，为我心恻，可用汲，王明，并受其福。"},
    {position:"六四",text:"井甃，无咎。"},
    {position:"九五",text:"井冽，寒泉食。"},
    {position:"上六",text:"井收勿幕，有孚元吉。"}
  ]
});
// ===== 卦49: 革 =====
details.push({
  judgment: "已日乃孚，元亨利贞，悔亡。",
  image: "泽中有火，革。君子以治历明时。",
  lines: [
    {position:"初九",text:"巩用黄牛之革。"},
    {position:"六二",text:"已日乃革之，征吉，无咎。"},
    {position:"九三",text:"征凶，贞厉，革言三就，有孚。"},
    {position:"九四",text:"悔亡，有孚改命，吉。"},
    {position:"九五",text:"大人虎变，未占有孚。"},
    {position:"上六",text:"君子豹变，小人革面，征凶，居贞吉。"}
  ]
});
// ===== 卦50: 鼎 =====
details.push({
  judgment: "元吉，亨。",
  image: "木上有火，鼎。君子以正位凝命。",
  lines: [
    {position:"初六",text:"鼎颠趾，利出否，得妾以其子，无咎。"},
    {position:"九二",text:"鼎有实，我仇有疾，不我能即，吉。"},
    {position:"九三",text:"鼎耳革，其行塞，雉膏不食，方雨亏悔，终吉。"},
    {position:"九四",text:"鼎折足，覆公餗，其形渥，凶。"},
    {position:"六五",text:"鼎黄耳金铉，利贞。"},
    {position:"上九",text:"鼎玉铉，大吉，无不利。"}
  ]
});
// ===== 卦51: 震 =====
details.push({
  judgment: "亨。震来虩虩，笑言哑哑。震惊百里，不丧匕鬯。",
  image: "洊雷，震。君子以恐惧修省。",
  lines: [
    {position:"初九",text:"震来虩虩，后笑言哑哑，吉。"},
    {position:"六二",text:"震来厉，亿丧贝，跻于九陵，勿逐，七日得。"},
    {position:"六三",text:"震苏苏，震行无眚。"},
    {position:"九四",text:"震遂泥。"},
    {position:"六五",text:"震往来厉，亿无丧，有事。"},
    {position:"上六",text:"震索索，视矍矍，征凶。震不于其躬，于其邻，无咎。婚媾有言。"}
  ]
});
// ===== 卦52: 艮 =====
details.push({
  judgment: "艮其背，不获其身，行其庭，不见其人，无咎。",
  image: "兼山，艮。君子以思不出其位。",
  lines: [
    {position:"初六",text:"艮其趾，无咎，利永贞。"},
    {position:"六二",text:"艮其腓，不拯其随，其心不快。"},
    {position:"九三",text:"艮其限，列其夤，厉薰心。"},
    {position:"六四",text:"艮其身，无咎。"},
    {position:"六五",text:"艮其辅，言有序，悔亡。"},
    {position:"上九",text:"敦艮，吉。"}
  ]
});
// ===== 卦53: 渐 =====
details.push({
  judgment: "女归吉，利贞。",
  image: "山上有木，渐。君子以居贤德善俗。",
  lines: [
    {position:"初六",text:"鸿渐于干，小子厉，有言，无咎。"},
    {position:"六二",text:"鸿渐于磐，饮食衎衎，吉。"},
    {position:"九三",text:"鸿渐于陆，夫征不复，妇孕不育，凶。利御寇。"},
    {position:"六四",text:"鸿渐于木，或得其桷，无咎。"},
    {position:"九五",text:"鸿渐于陵，妇三岁不孕，终莫之胜，吉。"},
    {position:"上九",text:"鸿渐于陆，其羽可用为仪，吉。"}
  ]
});
// ===== 卦54: 归妹 =====
details.push({
  judgment: "征凶，无攸利。",
  image: "泽上有雷，归妹。君子以永终知敝。",
  lines: [
    {position:"初九",text:"归妹以娣，跛能履，征吉。"},
    {position:"九二",text:"眇能视，利幽人之贞。"},
    {position:"六三",text:"归妹以须，反归以娣。"},
    {position:"九四",text:"归妹愆期，迟归有时。"},
    {position:"六五",text:"帝乙归妹，其君之袂，不如其娣之袂良，月几望，吉。"},
    {position:"上六",text:"女承筐无实，士刲羊无血，无攸利。"}
  ]
});
// ===== 卦55: 丰 =====
details.push({
  judgment: "亨，王假之，勿忧，宜日中。",
  image: "雷电皆至，丰。君子以折狱致刑。",
  lines: [
    {position:"初九",text:"遇其配主，虽旬无咎，往有尚。"},
    {position:"六二",text:"丰其蔀，日中见斗，往得疑疾，有孚发若，吉。"},
    {position:"九三",text:"丰其沛，日中见沫，折其右肱，无咎。"},
    {position:"九四",text:"丰其蔀，日中见斗，遇其夷主，吉。"},
    {position:"六五",text:"来章，有庆誉，吉。"},
    {position:"上六",text:"丰其屋，蔀其家，窥其户，阒其无人，三岁不觌，凶。"}
  ]
});
// ===== 卦56: 旅 =====
details.push({
  judgment: "小亨，旅贞吉。",
  image: "山上有火，旅。君子以明慎用刑，而不留狱。",
  lines: [
    {position:"初六",text:"旅琐琐，斯其所取灾。"},
    {position:"六二",text:"旅即次，怀其资，得童仆贞。"},
    {position:"九三",text:"旅焚其次，丧其童仆，贞厉。"},
    {position:"九四",text:"旅于处，得其资斧，我心不快。"},
    {position:"六五",text:"射雉一矢亡，终以誉命。"},
    {position:"上九",text:"鸟焚其巢，旅人先笑后号咷，丧牛于易，凶。"}
  ]
});
// ===== 卦57: 巽 =====
details.push({
  judgment: "小亨，利有攸往，利见大人。",
  image: "随风，巽。君子以申命行事。",
  lines: [
    {position:"初六",text:"进退，利武人之贞。"},
    {position:"九二",text:"巽在床下，用史巫纷若，吉无咎。"},
    {position:"九三",text:"频巽，吝。"},
    {position:"六四",text:"悔亡，田获三品。"},
    {position:"九五",text:"贞吉悔亡，无不利。无初有终，先庚三日，后庚三日，吉。"},
    {position:"上九",text:"巽在床下，丧其资斧，贞凶。"}
  ]
});
// ===== 卦58: 兑 =====
details.push({
  judgment: "亨，利贞。",
  image: "丽泽，兑。君子以朋友讲习。",
  lines: [
    {position:"初九",text:"和兑，吉。"},
    {position:"九二",text:"孚兑，吉，悔亡。"},
    {position:"六三",text:"来兑，凶。"},
    {position:"九四",text:"商兑未宁，介疾有喜。"},
    {position:"九五",text:"孚于剥，有厉。"},
    {position:"上六",text:"引兑。"}
  ]
});
// ===== 卦59: 涣 =====
details.push({
  judgment: "亨。王假有庙，利涉大川，利贞。",
  image: "风行水上，涣。先王以享于帝立庙。",
  lines: [
    {position:"初六",text:"用拯马壮，吉。"},
    {position:"九二",text:"涣奔其机，悔亡。"},
    {position:"六三",text:"涣其躬，无悔。"},
    {position:"六四",text:"涣其群，元吉。涣有丘，匪夷所思。"},
    {position:"九五",text:"涣汗其大号，涣王居，无咎。"},
    {position:"上九",text:"涣其血，去逖出，无咎。"}
  ]
});
// ===== 卦60: 节 =====
details.push({
  judgment: "亨。苦节不可贞。",
  image: "泽上有水，节。君子以制数度，议德行。",
  lines: [
    {position:"初九",text:"不出户庭，无咎。"},
    {position:"九二",text:"不出门庭，凶。"},
    {position:"六三",text:"不节若，则嗟若，无咎。"},
    {position:"六四",text:"安节，亨。"},
    {position:"九五",text:"甘节，吉，往有尚。"},
    {position:"上六",text:"苦节，贞凶，悔亡。"}
  ]
});
// ===== 卦61: 中孚 =====
details.push({
  judgment: "豚鱼吉，利涉大川，利贞。",
  image: "泽上有风，中孚。君子以议狱缓死。",
  lines: [
    {position:"初九",text:"虞吉，有它不燕。"},
    {position:"九二",text:"鹤鸣在阴，其子和之。我有好爵，吾与尔靡之。"},
    {position:"六三",text:"得敌，或鼓或罢，或泣或歌。"},
    {position:"六四",text:"月几望，马匹亡，无咎。"},
    {position:"九五",text:"有孚挛如，无咎。"},
    {position:"上九",text:"翰音登于天，贞凶。"}
  ]
});
// ===== 卦62: 小过 =====
details.push({
  judgment: "亨，利贞，可小事，不可大事。飞鸟遗之音，不宜上宜下，大吉。",
  image: "山上有雷，小过。君子以行过乎恭，丧过乎哀，用过乎俭。",
  lines: [
    {position:"初六",text:"飞鸟以凶。"},
    {position:"六二",text:"过其祖，遇其妣；不及其君，遇其臣，无咎。"},
    {position:"九三",text:"弗过防之，从或戕之，凶。"},
    {position:"九四",text:"无咎，弗过遇之，往厉必戒，勿用永贞。"},
    {position:"六五",text:"密云不雨，自我西郊，公弋取彼在穴。"},
    {position:"上六",text:"弗遇过之，飞鸟离之，凶，是谓灾眚。"}
  ]
});
// ===== 卦63: 既济 =====
details.push({
  judgment: "亨小，利贞，初吉终乱。",
  image: "水在火上，既济。君子以思患而预防之。",
  lines: [
    {position:"初九",text:"曳其轮，濡其尾，无咎。"},
    {position:"六二",text:"妇丧其茀，勿逐，七日得。"},
    {position:"九三",text:"高宗伐鬼方，三年克之，小人勿用。"},
    {position:"六四",text:"繻有衣袽，终日戒。"},
    {position:"九五",text:"东邻杀牛，不如西邻之禴祭，实受其福。"},
    {position:"上六",text:"濡其首，厉。"}
  ]
});
// ===== 卦64: 未济 =====
details.push({
  judgment: "亨，小狐汔济，濡其尾，无攸利。",
  image: "火在水上，未济。君子以慎辨物居方。",
  lines: [
    {position:"初六",text:"濡其尾，吝。"},
    {position:"九二",text:"曳其轮，贞吉。"},
    {position:"六三",text:"未济，征凶，利涉大川。"},
    {position:"九四",text:"贞吉，悔亡，震用伐鬼方，三年有赏于大国。"},
    {position:"六五",text:"贞吉，无悔，君子之光，有孚，吉。"},
    {position:"上九",text:"有孚于饮酒，无咎，濡其首，有孚失是。"}
  ]
});

// 组装
const hexagrams = hexList.map((h, i) => {
  const [name, upper, lower] = h;
  const d = details[i] || {};
  return {
    number: i + 1,
    name,
    fullName: fullNames[i],
    upperTrigram: upper,
    lowerTrigram: lower,
    binary: trigramBinary[lower] + trigramBinary[upper],
    unicode: String.fromCodePoint(0x4DC0 + i),
    judgment: d.judgment || '',
    image: d.image || '',
    lines: d.lines || [],
    summary: summaries[i]
  };
});

fs.writeFileSync(
  '/Users/ss/Documents/Project/Web/liuyao/data/hexagrams.json',
  JSON.stringify(hexagrams, null, 2),
  'utf8'
);
console.log(`Generated ${hexagrams.length} hexagrams`);
