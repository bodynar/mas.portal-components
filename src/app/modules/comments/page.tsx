import React from 'react';
import generateUid from '../../common/uid';

import Comments from './components/comments/comments';
import CommentItem from './types';

export default function CommentsPage(): JSX.Element {
    const comments: Array<CommentItem> = [
        {
            "id": "5f96f7aaebb81c3a763b11ac",
            "author": {
                "displayName": "Lesa",
                "initials": "LS",
            },
            "text": "Occaecat excepteur irure laborum laboris. Consectetur non sit ex officia in dolore id officia ad aute laborum. Qui mollit officia qui exercitation deserunt enim elit do et adipisicing proident. Ex reprehenderit adipisicing fugiat exercitation eiusmod sunt ea non ullamco et ea anim et. Ut occaecat velit nisi pariatur excepteur fugiat tempor ea ipsum tempor amet. Exercitation pariatur laboris consequat voluptate nostrud irure culpa ad et excepteur laboris. Excepteur do non duis incididunt veniam incididunt exercitation enim Lorem.",
            "date": new Date("Sat Oct 30 2020 20:18:20 GMT+0000")
        },
        {
            "id": "5f96f7aae967a5e69ba01228",
            "author": {
                "displayName": "Case",
                "initials": "CZ"
            },
            responseTo: "5f96f7aaebb81c3a763b11ac",
            "text": "Elit nostrud dolor duis ex anim amet incididunt dolor ad commodo est do elit dolore. Esse magna aliquip aliqua esse tempor nisi minim aliquip in labore. Sunt cupidatat pariatur sunt cupidatat exercitation esse voluptate consectetur amet velit ut aliqua mollit cupidatat. Ullamco velit irure esse nostrud veniam incididunt. Magna et adipisicing voluptate velit ea eu quis irure ex laborum enim sunt pariatur duis. Nulla esse incididunt consectetur deserunt mollit laborum aliquip. Tempor labore qui non labore eu aute sit dolore aliqua.",
            "date": new Date("Sun May 04 2014 00:12:02 GMT+0000")
        },
        {
            "id": "5f96f7aa00ee856a73e74f22",
            "author": {
                "displayName": "Collier",
                "initials": "CH"
            },
            responseTo: "5f96f7aaebb81c3a763b11ac",
            "text": "Fugiat ullamco fugiat in cillum in deserunt officia. In adipisicing eiusmod deserunt dolor ipsum eiusmod aliqua est et. Excepteur sint laboris adipisicing ut. Cillum non qui ut nulla sit amet qui. Et deserunt eu aliquip pariatur magna ex laborum anim culpa et proident velit. Fugiat et nostrud pariatur consequat. Anim eiusmod qui mollit ea deserunt aliqua labore Lorem deserunt do ipsum aliqua.",
            "date": new Date("Thu Mar 08 2018 00:51:58 GMT+0000")
        },
        {
            "id": "5f96f7aa174c6dd04caccc1f",
            "author": {
                "displayName": "Alvarez",
                "initials": "RA"
            },
            responseTo: "5f96f7aaebb81c3a763b11ac",
            "text": "Proident reprehenderit do adipisicing qui do. Esse voluptate pariatur anim pariatur veniam dolor consectetur. Ex id eu nulla laboris ex. In sunt in proident anim. Ex ullamco exercitation sunt ad incididunt et officia do pariatur incididunt officia do commodo enim. Incididunt dolore qui veniam aliqua esse quis sint dolor veniam cupidatat commodo consequat mollit. Nostrud et excepteur amet cupidatat laborum non aute elit consequat commodo amet irure irure occaecat.",
            "date": new Date("Sat Jun 11 2016 00:45:19 GMT+0000")
        },
        {
            "id": "5f96f7aadb8988b8cac72945",
            "author": {
                "displayName": "Wright",
                "initials": "WR"
            },
            "text": "Dolor anim ex amet dolore. Exercitation magna laborum eu eu. Lorem velit amet dolore Lorem sunt occaecat esse aliqua id. Cupidatat sit labore cillum est commodo et consequat. Proident nostrud ea officia eu deserunt cillum ipsum culpa minim. Enim eu minim eu sit. Dolor nulla do consectetur dolore incididunt ut ullamco quis dolor ullamco et mollit excepteur voluptate.",
            "date": new Date("Sun Jan 18 2015 07:33:58 GMT+0000")
        },
        {
            "id": "5f96f7aa4df1db4620d13579",
            "author": {
                "displayName": "Suzanne",
                "initials": "SW"
            },
            responseTo: "5f96f7aadb8988b8cac72945",
            "text": "Laborum fugiat aliqua voluptate esse elit consectetur sunt labore veniam officia nulla do. Mollit labore commodo incididunt nulla minim quis velit excepteur sint in ad. Lorem sint ipsum est labore excepteur ullamco. Laboris ea ipsum pariatur est incididunt enim nisi laboris Lorem cillum amet sunt ex irure. Eu in voluptate velit ullamco mollit non commodo dolore quis tempor magna esse dolor. Irure quis commodo enim exercitation deserunt deserunt proident. Eu sint aliqua anim cupidatat Lorem sit non pariatur.",
            "date": new Date("Wed May 09 2018 11:53:11 GMT+0000")
        },
        {
            "id": "5f96f7aa9fee2d712c15d6cd",
            "author": {
                "displayName": "Dotson",
                "initials": "DH"
            },
            responseTo: "5f96f7aadb8988b8cac72945",
            "text": "Eiusmod mollit sunt eiusmod et est nisi. Fugiat enim fugiat do proident voluptate aliqua dolor non quis consequat sit magna qui. Eu commodo dolor laboris sunt reprehenderit id. Consequat laboris qui ipsum et ut. Veniam consectetur tempor eiusmod ullamco eiusmod ad exercitation fugiat irure eiusmod sunt minim consequat voluptate. Et fugiat amet dolore aliquip ex cupidatat veniam aliquip laborum voluptate tempor pariatur aliqua pariatur. Elit eiusmod ea nisi id nisi ullamco elit minim reprehenderit est mollit minim ullamco aliquip.",
            "date": new Date("Fri Jul 10 2020 13:35:35 GMT+0000")
        },
        {
            "id": "5f96f7aab7c7e1af91181431",
            "author": {
                "displayName": "Meghan",
                "initials": "MF"
            },
            responseTo: "5f96f7aadb8988b8cac72945",
            "text": "Sit magna ut in tempor in anim. Et labore esse do cillum consequat sint laboris enim tempor minim in ex excepteur ad. Duis proident mollit do pariatur deserunt pariatur occaecat nisi est nisi magna dolor irure. Labore aliqua dolore sit voluptate ut. Ullamco labore ex sunt fugiat. Velit cillum magna culpa aliqua magna elit ad in pariatur pariatur amet. Aute eu veniam occaecat aliqua dolore ut laboris.",
            "date": new Date("Mon Feb 22 2016 16:34:42 GMT+0000")
        },
        {
            "id": "5f96f7aa61380b9fc05beb2a",
            "author": {
                "displayName": "Angelita",
                "initials": "AR"
            },
            responseTo: "5f96f7aa4df1db4620d13579",
            "text": "Consectetur commodo amet exercitation est deserunt reprehenderit qui ipsum incididunt fugiat nostrud eu labore minim. Quis aliqua commodo est irure pariatur laborum do cupidatat do aute laborum. Laborum elit ullamco quis occaecat ex eiusmod. Occaecat nostrud magna eiusmod et in duis excepteur dolore exercitation pariatur quis non deserunt qui. Tempor consectetur proident adipisicing et nulla aliqua cillum consequat qui laborum esse exercitation elit aliqua. Incididunt dolor irure dolore aliqua aliqua nisi labore ad ex aute ad. Ex ex pariatur nisi id ea fugiat in minim culpa proident ut ut.",
            "date": new Date("Sun Apr 05 2020 18:24:25 GMT+0000")
        },
        {
            "id": "5f96f7aa2ea1ba1ddee61e4f",
            "author": {
                "displayName": "Obrien",
                "initials": "OP"
            },
            responseTo: "5f96f7aa4df1db4620d13579",
            "text": "Officia ad officia nostrud do et incididunt officia aute. Fugiat ullamco dolore consequat esse duis eiusmod quis ut consectetur laborum est commodo commodo esse. Laboris non est consectetur Lorem deserunt sit in elit nulla. Proident laborum enim cupidatat est aliqua est dolor. Et reprehenderit cillum velit elit cupidatat non cupidatat qui cillum nulla mollit ipsum. Nulla in mollit eu sit. Est dolor dolor duis mollit veniam consequat in velit enim labore amet.",
            "date": new Date("Tue Aug 11 2020 21:58:43 GMT+0000")
        },
        {
            "id": "5f96f7aaf309ad5d9a6c1c2b",
            "author": {
                "displayName": "Mills",
                "initials": "DM"
            },
            responseTo: "5f96f7aa4df1db4620d13579",
            "text": "Excepteur fugiat commodo sit consequat deserunt voluptate minim ut in consequat. Labore amet anim duis dolor dolor aliquip deserunt. Duis labore proident laborum magna occaecat nisi consequat qui magna proident incididunt laborum sunt. Veniam eu ea adipisicing exercitation eu. Laboris dolor adipisicing sunt pariatur minim. Quis magna quis fugiat irure incididunt elit consectetur laborum sit veniam. Minim fugiat ex eu elit.",
            "date": new Date("Thu Aug 13 2015 22:33:01 GMT+0000")
        },
        {
            "id": "5f96f7aa4c8cc6b1c1871b11",
            "author": {
                "displayName": "Humphrey",
                "initials": "HL"
            },
            responseTo: "5f96f7aaf309ad5d9a6c1c2b",
            "text": "Nisi proident velit esse amet irure sunt culpa eiusmod reprehenderit aliqua ullamco voluptate. Ex cupidatat aliqua eiusmod mollit non laborum sint et labore. Tempor velit culpa amet nostrud irure deserunt consequat elit proident in aliquip. Duis eiusmod eu tempor reprehenderit commodo enim eu occaecat occaecat. Qui amet excepteur ea velit commodo sint deserunt magna incididunt elit. Exercitation nisi esse ut veniam occaecat amet magna sint. Consectetur est aliquip Lorem tempor elit reprehenderit esse pariatur quis voluptate labore id in.",
            "date": new Date("Sun Jun 10 2018 07:19:09 GMT+0000")
        },
        {
            "id": "5f96f7aa20a72db53634d50e",
            "author": {
                "displayName": "Aline",
                "initials": "AW"
            },
            responseTo: "5f96f7aaf309ad5d9a6c1c2b",
            "text": "Voluptate cupidatat ea incididunt proident ex magna aliqua eu cillum do occaecat aliqua. Aliqua pariatur enim quis laborum deserunt et sit laboris veniam do sit nostrud. Anim magna esse voluptate dolore est nostrud adipisicing sit proident. Aliquip esse ullamco esse dolor ullamco excepteur sit incididunt. Ut et exercitation consectetur sint deserunt magna tempor sunt. Est anim amet commodo sunt mollit exercitation. Eiusmod nostrud proident non quis laboris culpa ullamco ad exercitation culpa excepteur esse id irure.",
            "date": new Date("Wed Oct 02 2019 13:45:20 GMT+0000")
        },
        {
            "id": "5f96f7aa7697607e119ecf05",
            "author": {
                "displayName": "Best",
                "initials": "BA"
            },
            responseTo: "5f96f7aaf309ad5d9a6c1c2b",
            "text": "Ex ut enim sit Lorem qui adipisicing occaecat consequat. Esse exercitation non commodo dolore aliqua eiusmod et consequat reprehenderit aliquip. Ipsum deserunt esse eu fugiat nostrud culpa ea excepteur veniam. Sit ullamco amet cillum est veniam. Irure cupidatat laborum proident fugiat duis. Culpa eiusmod quis cillum et minim culpa cupidatat fugiat. Anim nisi culpa ea duis consectetur magna id magna fugiat.",
            "date": new Date("Thu Aug 16 2018 14:15:12 GMT+0000")
        },
        {
            "id": "5f96f7aafdc6a3db6d6447fc",
            "author": {
                "displayName": "Ramsey",
                "initials": "RS"
            },
            responseTo: "5f96f7aa7697607e119ecf05",
            "text": "Sint ad quis nostrud id do tempor. Ad consequat ex consectetur sit pariatur ullamco velit aliquip dolor veniam consequat ex reprehenderit. Culpa ea ullamco eiusmod enim incididunt enim. Exercitation sint ipsum sint ad consequat amet dolore ea do nostrud. Laboris officia eu id et aliqua excepteur deserunt tempor sunt. Eiusmod magna do commodo duis occaecat. Dolor minim ipsum minim ipsum nisi.",
            "date": new Date("Thu Apr 14 2016 22:03:07 GMT+0000")
        },
        {
            "id": "5f96f7aa42bb0f57185d21b5",
            "author": {
                "displayName": "Helena",
                "initials": "HT"
            },
            responseTo: "5f96f7aa7697607e119ecf05",
            "text": "Aute sit officia irure dolore incididunt pariatur veniam ut aute ex exercitation. Cupidatat consectetur elit nostrud nulla minim. Eu non mollit mollit do laborum quis exercitation. Duis magna ea non consequat eiusmod consequat officia dolor exercitation ut cillum. Sit esse do id reprehenderit ad occaecat quis veniam consequat cillum. Tempor et cupidatat aute ex aliqua id officia minim veniam dolore veniam qui. Adipisicing ut reprehenderit eiusmod consequat non nulla laborum fugiat ipsum officia nulla ad dolore.",
            "date": new Date("Tue Feb 21 2017 12:00:07 GMT+0000")
        },
        {
            "id": "5f96f7aad4571a38378a009f",
            "author": {
                "displayName": "Hays",
                "initials": "HC"
            },
            responseTo: "5f96f7aa7697607e119ecf05",
            "text": "Dolore reprehenderit laboris ut ex mollit esse. Commodo labore enim tempor laborum consequat dolor. Magna sit eiusmod mollit sit cillum. Duis tempor voluptate nisi reprehenderit eiusmod elit sunt fugiat id tempor. Laboris do ullamco ad ipsum do excepteur nisi. Adipisicing non excepteur magna ipsum occaecat velit id duis qui aliqua cillum. Veniam cupidatat qui ea nostrud consectetur do cillum.",
            "date": new Date("Thu Oct 30 2014 14:07:58 GMT+0000")
        },
        {
            "id": "5f96f7aaf510dd94519c795a",
            "author": {
                "displayName": "Compton",
                "initials": "CC"
            },
            responseTo: "5f96f7aa7697607e119ecf05",
            "text": "Commodo occaecat nisi sit officia amet. Qui non tempor labore minim. Sunt pariatur laborum sit duis esse incididunt proident. Cillum labore consectetur aliquip deserunt deserunt est magna mollit consectetur. Voluptate reprehenderit nisi Lorem est ullamco amet duis officia non velit est non dolore qui. Nisi amet ea magna fugiat esse eu. Cillum est ipsum occaecat et velit non elit et nostrud labore.",
            "date": new Date("Mon Jun 13 2016 03:22:57 GMT+0000")
        },
        {
            "id": "5f96f7aa3539b5d216c6e70a",
            "author": {
                "displayName": "Nunez",
                "initials": "NN"
            },
            responseTo: "5f96f7aaf510dd94519c795a",
            "text": "Quis quis fugiat excepteur eu qui proident deserunt do fugiat ullamco. Nostrud duis commodo labore culpa elit. Sint mollit consectetur duis nisi ullamco incididunt duis commodo. Duis et exercitation consectetur sunt ea esse proident deserunt. Adipisicing sint eu mollit esse ad veniam dolor. Labore do deserunt eiusmod aliqua aute consectetur laboris et nisi. Enim eiusmod ipsum laborum cupidatat officia elit laboris.",
            "date": new Date("Thu Oct 03 2019 14:38:09 GMT+0000")
        },
        {
            "id": "5f96f7aa45cba7ee5323257d",
            "author": {
                "displayName": "Madden",
                "initials": "MW"
            },
            responseTo: "5f96f7aaf510dd94519c795a",
            "text": "Excepteur Lorem mollit incididunt laborum elit duis consequat occaecat consequat laboris et. Sint pariatur occaecat ipsum id veniam aliqua esse in magna incididunt. Consectetur dolor laboris occaecat nulla nostrud tempor in laborum irure amet et. Culpa do pariatur consectetur proident pariatur quis elit Lorem nisi laborum do. Velit anim ad pariatur reprehenderit. Nisi culpa in deserunt reprehenderit qui aliqua eiusmod ad sunt eiusmod eiusmod consequat ea ea. Magna esse culpa velit et labore tempor irure deserunt anim.",
            "date": new Date("Tue Sep 05 2017 09:06:01 GMT+0000")
        },
        {
            "id": "5f96f7aac8f09fc4d32c9d52",
            "author": {
                "displayName": "Bertha",
                "initials": "BS"
            },
            responseTo: "5f96f7aaf510dd94519c795a",
            "text": "Culpa nulla adipisicing ex cupidatat et cupidatat fugiat eiusmod ullamco nulla consequat velit ut reprehenderit. Incididunt aliquip in laborum est aliqua nostrud Lorem proident sint voluptate proident veniam sunt ea. Velit magna aliqua proident dolor sint minim ipsum nulla et laborum ex velit. Cillum sit officia commodo excepteur tempor non eu cupidatat non ea. Consequat ad magna irure dolor voluptate cillum irure aliquip cillum nostrud excepteur aute nostrud. Occaecat eiusmod id eu eiusmod eu. Officia do deserunt consequat esse.",
            "date": new Date("Tue Mar 13 2018 00:28:38 GMT+0000")
        },
        {
            "id": "5f96f7aab26af3c0bb2339e1",
            "author": {
                "displayName": "Laura",
                "initials": "LD"
            },
            responseTo: "5f96f7aaf510dd94519c795a",
            "text": "In est ullamco voluptate reprehenderit reprehenderit Lorem. Cillum labore sint eu aliqua magna aliqua labore. Aliqua anim magna sit magna proident eiusmod tempor ipsum laboris in. Qui ipsum in cupidatat pariatur. Officia labore nulla proident ea. Exercitation pariatur consectetur sit ut et minim amet quis. Aliqua cupidatat esse in occaecat magna irure irure quis esse.",
            "date": new Date("Mon Mar 09 2015 12:37:52 GMT+0000")
        },
        {
            "id": "5f96f7aad46862d985e24cbd",
            "author": {
                "displayName": "Fox",
                "initials": "FT"
            },
            responseTo: "5f96f7aac8f09fc4d32c9d52",
            "text": "Ea esse aliquip nisi enim amet adipisicing amet velit anim dolore aliqua anim ea dolor. Nulla enim reprehenderit fugiat mollit minim. Dolore ex officia nisi reprehenderit laborum aliquip fugiat eiusmod ex cupidatat laborum ipsum. Mollit proident pariatur consectetur consectetur nulla Lorem aliqua mollit aliqua veniam amet est consequat. Aliqua minim et nisi elit. Nisi dolor sunt cupidatat officia laborum quis id ipsum laborum ea officia labore. Eiusmod deserunt reprehenderit sint minim ut fugiat ullamco deserunt laboris minim.",
            "date": new Date("Tue Oct 18 2016 11:38:05 GMT+0000")
        },
        {
            "id": "5f96f7aaf7fc9bfe36f6b197",
            "author": {
                "displayName": "Lydia",
                "initials": "LW"
            },
            responseTo: "5f96f7aac8f09fc4d32c9d52",
            "text": "Pariatur nostrud aute commodo minim est. Fugiat dolore sint proident anim officia sunt occaecat culpa mollit aliqua. Officia ut cupidatat consequat occaecat proident. Sunt non consectetur elit cillum Lorem reprehenderit excepteur eu do nulla aliqua velit. Nulla adipisicing cillum sit commodo cupidatat enim labore est irure tempor ea in. Cillum aliqua ea ea velit deserunt cupidatat ipsum. Et quis in ex voluptate labore.",
            "date": new Date("Fri Feb 10 2017 16:16:15 GMT+0000")
        },
        {
            "id": "5f96f7aa82285a352de1b524",
            "author": {
                "displayName": "Hillary",
                "initials": "HC"
            },
            responseTo: "5f96f7aac8f09fc4d32c9d52",
            "text": "Et sunt ex exercitation aliquip nisi ut duis eu nulla. Nisi duis eu enim aliquip velit culpa et laboris aliquip. Eiusmod dolor occaecat aliquip ullamco nostrud. Ut non sunt sint amet occaecat aliqua in mollit culpa ut. Enim incididunt id deserunt ad enim anim dolor. Ad labore consequat fugiat ad exercitation ut ipsum amet amet in deserunt fugiat magna irure. Voluptate aliqua do adipisicing non.",
            "date": new Date("Tue Aug 02 2016 15:26:57 GMT+0000")
        }
    ].map((comment, index, comments) => ({
        ...comment,
        author: {
            ...comment.author,
            avatar: (index % 3 === 0)
                ? (index % 5 === 0)
                    ? "https://picsum.photos/100/350?blur"
                    : "https://picsum.photos/60/60"
                : undefined
        },
        responseToAuthor: comments.find(x => x.id === comment.responseTo)?.author.displayName
    }));

    const onAddCommentClick = (comment: string, responseTo?: string): Promise<CommentItem> => {
        const newComment: CommentItem = {
            id: generateUid(),
            author: {
                displayName: "Test admin",
                initials: "TA",
                avatar: "https://picsum.photos/60/60"
            },
            date: new Date(),
            text: comment,
            responseTo: responseTo,
            responseToAuthor: comments.find(x => x.id === responseTo)?.author.displayName
        };

        comments.push(newComment);

        return Promise.resolve(newComment);
    };


    return (
        <div style={{ width: '70vw', margin: '5em auto' }}>
            <Comments
                comments={comments}
                // displayCommentsMode={'flat'}
                // maxDeepLevel={3}
                onAddCommentClick={onAddCommentClick}
            />
        </div>

    );
};