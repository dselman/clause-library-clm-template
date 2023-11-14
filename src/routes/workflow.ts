export const WORKFLOW = {
    "cells": [
        {
            "type": "springcm.Link",
            "source": {
                "id": "bdcce7a8-ee70-429b-9c96-08d62223e789",
                "port": "e",
                "selector": "> g:nth-child(1) > g:nth-child(3) > circle:nth-child(8)"
            },
            "target": {
                "id": "74ed8628-4e7b-4723-a234-e092f14f1129",
                "port": "w",
                "selector": "> g:nth-child(1) > g:nth-child(5) > circle:nth-child(4)"
            },
            "router": {
                "name": "manhattan",
                "args": {
                    "excludeTypes": [
                        "springcm.Group",
                        "springcm.Lane"
                    ]
                }
            },
            "id": "635797e3-9e2e-48de-b361-e62ea9286ee5",
            "z": 1000016,
            "name": {
                "type": "String",
                "value": "Link 2"
            },
            "attrs": {}
        },
        {
            "type": "springcm.Link",
            "source": {
                "id": "cb8ee37b-7f8d-4c2d-bb0d-8c7027017adc",
                "port": "e",
                "selector": "> g:nth-child(1) > g:nth-child(5) > circle:nth-child(5)"
            },
            "target": {
                "id": "9efe9626-e516-4b9b-9036-a69eb9e8dc16",
                "port": "w",
                "selector": "> g:nth-child(1) > g:nth-child(3) > circle:nth-child(5)"
            },
            "router": {
                "name": "manhattan",
                "args": {
                    "excludeTypes": [
                        "springcm.Group",
                        "springcm.Lane"
                    ]
                }
            },
            "id": "13383453-bb96-4946-9b8c-5d4e5542d3d1",
            "z": 1000017,
            "name": {
                "type": "String",
                "value": "Link 1"
            },
            "vertices": [] as object[],
            "description": {
                "type": "String",
                "value": ""
            },
            "attrs": {}
        },
        {
            "type": "springcm.Link",
            "source": {
                "id": "3de29173-f63e-4b00-846a-13314ac7aa99",
                "port": "e",
                "selector": "> g:nth-child(1) > g:nth-child(3) > circle:nth-child(8)"
            },
            "target": {
                "id": "bdcce7a8-ee70-429b-9c96-08d62223e789",
                "port": "w",
                "selector": "> g:nth-child(1) > g:nth-child(3) > circle:nth-child(5)"
            },
            "router": {
                "name": "manhattan",
                "args": {
                    "excludeTypes": [
                        "springcm.Group",
                        "springcm.Lane"
                    ]
                }
            },
            "id": "ac2014dd-11d4-43c6-b32f-40b1808b091c",
            "z": 1000045,
            "name": {
                "type": "String",
                "value": "Link 3"
            },
            "attrs": {}
        },
        {
            "type": "springcm.Link",
            "source": {
                "id": "79e80bce-26c8-4306-ad47-e3fb58ab8049",
                "port": "e",
                "selector": "> g:nth-child(1) > g:nth-child(3) > circle:nth-child(8)"
            },
            "target": {
                "id": "3de29173-f63e-4b00-846a-13314ac7aa99",
                "port": "w",
                "selector": "> g:nth-child(1) > g:nth-child(3) > circle:nth-child(5)"
            },
            "router": {
                "name": "manhattan",
                "args": {
                    "excludeTypes": [
                        "springcm.Group",
                        "springcm.Lane"
                    ]
                }
            },
            "id": "910f0058-6e37-4e25-a18e-1340199dd724",
            "z": 1000054,
            "name": {
                "type": "String",
                "value": "Link 5"
            },
            "attrs": {}
        },
        {
            "type": "springcm.Link",
            "source": {
                "id": "9efe9626-e516-4b9b-9036-a69eb9e8dc16",
                "port": "e",
                "selector": "> g:nth-child(1) > g:nth-child(3) > circle:nth-child(8)"
            },
            "target": {
                "id": "79e80bce-26c8-4306-ad47-e3fb58ab8049",
                "port": "w",
                "selector": "> g:nth-child(1) > g:nth-child(3) > circle:nth-child(5)"
            },
            "router": {
                "name": "manhattan",
                "args": {
                    "excludeTypes": [
                        "springcm.Group",
                        "springcm.Lane"
                    ]
                }
            },
            "id": "76c38687-72a3-468a-96e8-0fb5ce4d0056",
            "z": 1000057,
            "name": {
                "type": "String",
                "value": "Link 4"
            },
            "attrs": {}
        },
        {
            "size": {
                "width": 100,
                "height": 100
            },
            "content": "",
            "type": "springcm.Circle",
            "position": {
                "x": 60,
                "y": 60
            },
            "angle": 0,
            "activityName": "StartActivity",
            "group": "hidden",
            "icon": {
                "path": "start.svg#Dark",
                "color": "white"
            },
            "z": 2000001,
            "id": "cb8ee37b-7f8d-4c2d-bb0d-8c7027017adc",
            "name": {
                "type": "String",
                "value": "Start"
            },
            "definedVariables": {
                "type": "Variable",
                "value": [
                    {
                        "type": "Xml",
                        "value": {
                            "name": "Params",
                            "displayName": "Params",
                            "description": "",
                            "displayType": "CustomXml",
                            "schema": {
                                "nodes": [
                                    {
                                        "name": "Params",
                                        "type": "element",
                                        "dataType": "string",
                                        "guid": "8959c382-f4d6-4cce-8b5e-a749fffc86e0",
                                        "isRoot": true,
                                        "nodes": [
                                            {
                                                "name": "Documents",
                                                "nodes": [
                                                    {
                                                        "name": "Document",
                                                        "nodes": [
                                                            {
                                                                "name": "Id",
                                                                "dataType": "string",
                                                                "type": "element",
                                                                "guid": "08cb0a9d-19aa-4c6f-a528-76e0b4295a21"
                                                            },
                                                            {
                                                                "name": "Description",
                                                                "dataType": "string",
                                                                "type": "element",
                                                                "guid": "efc8beeb-3d7e-4eed-803f-3f6085309ccf"
                                                            },
                                                            {
                                                                "name": "Name",
                                                                "dataType": "string",
                                                                "type": "element",
                                                                "guid": "7d3df3e5-825f-478e-afdf-c097e16c0d60"
                                                            },
                                                            {
                                                                "name": "ParentFolderId",
                                                                "dataType": "string",
                                                                "type": "element",
                                                                "guid": "56a1daa8-5e4d-491d-ab1f-33d0f4210b0e"
                                                            },
                                                            {
                                                                "name": "CreatedBy",
                                                                "dataType": "string",
                                                                "type": "element",
                                                                "guid": "933b9233-201d-4658-a84d-739dedcbdbc9"
                                                            },
                                                            {
                                                                "name": "CreatedDate",
                                                                "dataType": "dateTime",
                                                                "type": "element",
                                                                "guid": "60bbfe69-d3f5-4798-a631-ac8e3a1b073e"
                                                            },
                                                            {
                                                                "name": "ParentFolderName",
                                                                "dataType": "string",
                                                                "type": "element",
                                                                "guid": "0ddad896-5e3f-4d81-9b60-c6ebcb048ae0"
                                                            },
                                                            {
                                                                "name": "UpdatedBy",
                                                                "dataType": "string",
                                                                "type": "element",
                                                                "guid": "8811bdaa-c195-4bf6-9d2e-4bef6693f429"
                                                            },
                                                            {
                                                                "name": "UpdatedDate",
                                                                "dataType": "dateTime",
                                                                "type": "element",
                                                                "guid": "f0c78a48-10c6-48a5-9833-f8e63b8c9d8b"
                                                            },
                                                            {
                                                                "name": "IsFormDocument",
                                                                "dataType": "boolean",
                                                                "type": "element",
                                                                "guid": "9570f6e2-221d-4855-8bd4-70a07c905409"
                                                            },
                                                            {
                                                                "name": "IsTermDocument",
                                                                "dataType": "boolean",
                                                                "type": "element",
                                                                "guid": "0e257a56-48c9-4c05-8174-fdbbf18c4324"
                                                            },
                                                            {
                                                                "name": "EditDocumentURL",
                                                                "dataType": "string",
                                                                "type": "element",
                                                                "guid": "f3b02553-97d5-41ff-8951-be73b7615331"
                                                            },
                                                            {
                                                                "name": "IsCheckedOut",
                                                                "dataType": "boolean",
                                                                "type": "element",
                                                                "guid": "0d521f5b-28c0-4028-9757-4bc8991dbc5d"
                                                            },
                                                            {
                                                                "name": "MIMEType",
                                                                "dataType": "string",
                                                                "type": "element",
                                                                "guid": "5ebfe290-84a9-48df-9e82-1faf92cb2511"
                                                            },
                                                            {
                                                                "name": "PageCount",
                                                                "dataType": "string",
                                                                "type": "element",
                                                                "guid": "da912f43-64dd-4a42-a93f-e590fc277f63"
                                                            }
                                                        ],
                                                        "guid": "01ee8816-c4ff-4235-913f-4a63e0805f50"
                                                    }
                                                ],
                                                "guid": "6c1e8299-35ff-4a7a-a209-087dc30f2caf"
                                            }
                                        ]
                                    }
                                ]
                            },
                            "sortable": false,
                            "editable": true,
                            "editableValue": true,
                            "deletable": true,
                            "draggable": true,
                            "preDefined": false,
                            "isContent": true,
                            "isLocal": false
                        }
                    },
                    {
                        "type": "User",
                        "value": {
                            "name": "SubmittedBy",
                            "displayName": "Submitted By",
                            "description": "",
                            "displayType": "Actor",
                            "schema": {
                                "name": "UserAccount",
                                "nodes": [
                                    {
                                        "name": "Name",
                                        "dataType": "string",
                                        "type": "element",
                                        "guid": "f006d0fa-aef6-4035-ac82-d4a20605d116"
                                    },
                                    {
                                        "name": "CreatedDate",
                                        "dataType": "dateTime",
                                        "type": "element",
                                        "guid": "2404c63f-8cbc-4543-b6f8-0fad86395d61"
                                    },
                                    {
                                        "name": "Email",
                                        "dataType": "string",
                                        "type": "element",
                                        "guid": "624bfc38-743f-4332-9447-2f27744bf676"
                                    },
                                    {
                                        "name": "FirstName",
                                        "dataType": "string",
                                        "type": "element",
                                        "guid": "097baf88-84f2-4026-92d5-deb5c1737539"
                                    },
                                    {
                                        "name": "LastName",
                                        "dataType": "string",
                                        "type": "element",
                                        "guid": "f4464e47-3ba0-4adf-9a41-e1515ca64887"
                                    },
                                    {
                                        "name": "ManagerUid",
                                        "dataType": "string",
                                        "type": "element",
                                        "guid": "43c9f9f4-a5da-4e98-a63a-c7baf1f9858c"
                                    },
                                    {
                                        "name": "Role",
                                        "dataType": "string",
                                        "type": "element",
                                        "guid": "fd3f9927-475a-49d8-b461-ecc40aa7534d"
                                    },
                                    {
                                        "name": "Uid",
                                        "dataType": "string",
                                        "type": "element",
                                        "guid": "97c97a4c-143f-48e9-94db-f7b6d17c52ea"
                                    },
                                    {
                                        "name": "Language",
                                        "dataType": "string",
                                        "type": "element",
                                        "guid": "1d5dccc8-5e1f-4aa2-8334-381644ae85ef"
                                    },
                                    {
                                        "name": "Region",
                                        "dataType": "string",
                                        "type": "element",
                                        "guid": "43bd2815-de04-426c-b9a4-2f37e35758aa"
                                    }
                                ]
                            },
                            "sortable": false,
                            "editable": false,
                            "editableValue": false,
                            "deletable": false,
                            "draggable": true,
                            "preDefined": true
                        }
                    },
                    {
                        "type": "String",
                        "value": {
                            "name": "Comments",
                            "displayName": "Comments",
                            "description": "",
                            "displayType": "Text",
                            "schema": {},
                            "sortable": false,
                            "editable": false,
                            "editableValue": true,
                            "deletable": false,
                            "draggable": true,
                            "preDefined": false
                        }
                    },
                    {
                        "type": "System",
                        "value": {
                            "name": "Date",
                            "displayName": "Current Date",
                            "description": "",
                            "displayType": "System",
                            "schema": {},
                            "sortable": false,
                            "editable": false,
                            "editableValue": false,
                            "deletable": false,
                            "draggable": true,
                            "preDefined": true
                        }
                    },
                    {
                        "type": "System",
                        "value": {
                            "name": "Time",
                            "displayName": "Current Time",
                            "description": "",
                            "displayType": "System",
                            "schema": {},
                            "sortable": false,
                            "editable": false,
                            "editableValue": false,
                            "deletable": false,
                            "draggable": true,
                            "preDefined": true
                        }
                    },
                    {
                        "type": "System",
                        "value": {
                            "name": "Link",
                            "displayName": "Current Step Link",
                            "description": "",
                            "displayType": "System",
                            "schema": {},
                            "sortable": false,
                            "editable": false,
                            "editableValue": false,
                            "deletable": false,
                            "draggable": true,
                            "preDefined": true
                        }
                    },
                    {
                        "type": "System",
                        "value": {
                            "name": "LastAbortEmail",
                            "displayName": "Last Abort Email",
                            "description": "",
                            "displayType": "System",
                            "schema": {},
                            "sortable": false,
                            "editable": false,
                            "editableValue": false,
                            "deletable": false,
                            "draggable": true,
                            "preDefined": true
                        }
                    },
                    {
                        "type": "Xml",
                        "value": {
                            "name": "mergeOutput",
                            "displayName": "mergeOutput",
                            "description": "",
                            "displayType": "Document",
                            "schema": {
                                "nodes": [
                                    {
                                        "name": "Documents",
                                        "nodes": [
                                            {
                                                "name": "Document",
                                                "nodes": [
                                                    {
                                                        "name": "Id",
                                                        "dataType": "string",
                                                        "type": "element",
                                                        "guid": "104c9396-a179-4407-841b-4781281eb82f"
                                                    },
                                                    {
                                                        "name": "Description",
                                                        "dataType": "string",
                                                        "type": "element",
                                                        "guid": "e41f99ad-d06c-44be-8026-b4b2ecc61fee"
                                                    },
                                                    {
                                                        "name": "Name",
                                                        "dataType": "string",
                                                        "type": "element",
                                                        "guid": "bb7c73f6-31bd-4d78-9366-018639bc3246"
                                                    },
                                                    {
                                                        "name": "ParentFolderId",
                                                        "dataType": "string",
                                                        "type": "element",
                                                        "guid": "742ac7fa-55f2-4ece-819e-e352c7121a45"
                                                    },
                                                    {
                                                        "name": "CreatedBy",
                                                        "dataType": "string",
                                                        "type": "element",
                                                        "guid": "eb988f70-374e-473c-8858-9eef16eb12ef"
                                                    },
                                                    {
                                                        "name": "CreatedDate",
                                                        "dataType": "dateTime",
                                                        "type": "element",
                                                        "guid": "cf851e32-1a7f-4c28-98e0-db88d9d1d838"
                                                    },
                                                    {
                                                        "name": "ParentFolderName",
                                                        "dataType": "string",
                                                        "type": "element",
                                                        "guid": "266ffbfb-2c9e-4610-a32e-237febe15c83"
                                                    },
                                                    {
                                                        "name": "UpdatedBy",
                                                        "dataType": "string",
                                                        "type": "element",
                                                        "guid": "00ededc9-296d-4d5a-9c89-cb402461204f"
                                                    },
                                                    {
                                                        "name": "UpdatedDate",
                                                        "dataType": "dateTime",
                                                        "type": "element",
                                                        "guid": "5c04200e-f459-4eee-925f-be86b812fc83"
                                                    },
                                                    {
                                                        "name": "IsFormDocument",
                                                        "dataType": "boolean",
                                                        "type": "element",
                                                        "guid": "07ca4a33-a9b7-48e6-8bef-7fe1f6281973"
                                                    },
                                                    {
                                                        "name": "IsTermDocument",
                                                        "dataType": "boolean",
                                                        "type": "element",
                                                        "guid": "9c3b6bb6-056b-472e-b575-d80e1f795c99"
                                                    },
                                                    {
                                                        "name": "EditDocumentURL",
                                                        "dataType": "string",
                                                        "type": "element",
                                                        "guid": "4b513b04-e33c-4158-a24c-e9628c564bde"
                                                    },
                                                    {
                                                        "name": "IsCheckedOut",
                                                        "dataType": "boolean",
                                                        "type": "element",
                                                        "guid": "6167839f-4db3-48be-a794-1c13969dd09c"
                                                    },
                                                    {
                                                        "name": "PageCount",
                                                        "dataType": "string",
                                                        "type": "element",
                                                        "guid": "0280db5d-f880-4f89-a01f-1bd1841eb42a"
                                                    }
                                                ],
                                                "guid": "8b6967cb-13e7-4080-8eeb-e7df90120f31"
                                            }
                                        ],
                                        "guid": "1314aa9a-8b25-43ee-88a6-4b7d5817d4b4"
                                    }
                                ]
                            },
                            "sortable": true,
                            "editable": true,
                            "editableValue": true,
                            "deletable": true,
                            "draggable": true,
                            "preDefined": false,
                            "isContent": false,
                            "isLocal": false
                        }
                    },
                    {
                        "type": "Number",
                        "value": {
                            "name": "MergeDataStatus",
                            "displayName": "MergeDataStatus",
                            "description": "",
                            "displayType": "Number",
                            "schema": {},
                            "sortable": true,
                            "editable": true,
                            "editableValue": true,
                            "deletable": true,
                            "draggable": true,
                            "preDefined": false
                        }
                    },
                    {
                        "type": "Xml",
                        "value": {
                            "name": "ClauseMergeData",
                            "displayName": "ClauseMergeData",
                            "description": "",
                            "displayType": "CustomXml",
                            "schema": {
                                "nodes": [
                                    {
                                        "name": "root",
                                        "type": "element",
                                        "dataType": "string",
                                        "guid": "9a499d39-208f-49b6-9da8-be19f29e6a02",
                                        "isRoot": true
                                    }
                                ]
                            },
                            "sortable": true,
                            "editable": true,
                            "editableValue": true,
                            "deletable": true,
                            "draggable": true,
                            "preDefined": false,
                            "isContent": false,
                            "isLocal": false
                        }
                    },
                    {
                        "type": "String",
                        "value": {
                            "name": "DocumentId",
                            "displayName": "DocumentId",
                            "description": "",
                            "displayType": "Text",
                            "schema": {},
                            "sortable": true,
                            "editable": true,
                            "editableValue": true,
                            "deletable": true,
                            "draggable": true,
                            "preDefined": false
                        }
                    },
                    {
                        "type": "String",
                        "value": {
                            "name": "MergeFolder",
                            "displayName": "MergeFolder",
                            "description": "",
                            "displayType": "Text",
                            "schema": {},
                            "sortable": true,
                            "editable": true,
                            "editableValue": true,
                            "deletable": true,
                            "draggable": true,
                            "preDefined": false
                        }
                    }
                ]
            },
            "workflowName": {
                "type": "String",
                "value": "Clause Library Workflow"
            },
            "sendNotification": {
                "type": "Bool",
                "value": false
            },
            "trackActivity": {
                "type": "Bool",
                "value": true
            },
            "attrs": {
                ".steptext": {
                    "ref-y": ".66",
                    "y-alignment": "middle",
                    "text": "Start",
                    "lineHeight": "1.4em"
                },
                "use": {
                    "xlink:href": "/atlassupport/scripts/jointjs/svg/start.svg#Dark"
                },
                "svg": {
                    "color": "white"
                },
                "circle": {
                    "fill": "#A0CC23"
                }
            }
        },
        {
            "size": {
                "width": 100,
                "height": 100
            },
            "content": "",
            "type": "springcm.Circle",
            "position": {
                "x": 909,
                "y": 72
            },
            "angle": 0,
            "activityName": "EndActivity",
            "group": "engineActivities",
            "icon": {
                "path": "finish.svg#Dark",
                "color": "white"
            },
            "id": "74ed8628-4e7b-4723-a234-e092f14f1129",
            "z": 2000003,
            "name": {
                "type": "String",
                "value": "Finish 1"
            },
            "stepDescription": {
                "type": "String",
                "value": ""
            },
            "attrs": {
                ".circle-container": {
                    "fill": "#29bdbe",
                    "class": "circle-container theme_primary_fill"
                },
                ".steptext": {
                    "ref-y": ".66",
                    "y-alignment": "middle",
                    "text": "Finish 1",
                    "lineHeight": "1.4em"
                },
                "use": {
                    "xlink:href": "/atlassupport/scripts/jointjs/svg/finish.svg#Dark"
                },
                "svg": {
                    "color": "white"
                }
            }
        },
        {
            "size": {
                "width": 100,
                "height": 100
            },
            "content": "",
            "type": "springcm.Step",
            "position": {
                "x": 735,
                "y": 71
            },
            "angle": 0,
            "activityName": "XmlMergeDocumentActivity",
            "group": "engineActivities",
            "icon": {
                "path": "xml_merge_doc.svg#Dark",
                "color": "#29bdbe"
            },
            "id": "bdcce7a8-ee70-429b-9c96-08d62223e789",
            "z": 2000008,
            "name": {
                "type": "String",
                "value": "XML Merge Document"
            },
            "stepDescription": {
                "type": "String",
                "value": ""
            },
            "documentName": {
                "type": "String",
                "value": "output_merge.docx"
            },
            "dataSource": {
                "type": "Variable",
                "value": {
                    "type": "Xml",
                    "value": "ClauseMergeData"
                }
            },
            "selectTemplate": {
                "type": "Document",
                "value": [
                    {
                        "type": "Variable",
                        "value": {
                            "type": "String",
                            "value": "DocumentId"
                        }
                    }
                ]
            },
            "targetFolder": {
                "type": "Folder",
                "value": [
                    {
                        "type": "Variable",
                        "value": {
                            "type": "String",
                            "value": "MergeFolder"
                        }
                    }
                ]
            },
            "waitForPdf": {
                "type": "Bool",
                "value": true
            },
            "outputDocuments": {
                "type": "Variable",
                "value": {
                    "type": "Xml",
                    "value": "mergeOutput"
                }
            },
            "attrs": {
                ".steptext": {
                    "ref-y": ".66",
                    "y-alignment": "middle",
                    "text": "XML Merge\nDocument",
                    "lineHeight": "1.4em"
                },
                ".description": {
                    "opacity": 0,
                    "ref": ".step-container",
                    "ref-x": 0.5,
                    "ref-dy": 0
                },
                ".descriptionbox": {
                    "width": 0,
                    "height": 0,
                    "rx": 0,
                    "ry": 0,
                    "x": 0,
                    "y": 0
                },
                ".descriptiontext": {
                    "text": ""
                },
                "use": {
                    "xlink:href": "/atlassupport/scripts/jointjs/svg/xml_merge_doc.svg#Dark"
                },
                "svg": {
                    "color": "#29bdbe",
                    "fill": "#fff"
                },
                "rect": {
                    "fill": "#29bdbe"
                },
                ".step-container": {
                    "data-error-state": false
                }
            }
        },
        {
            "size": {
                "width": 100,
                "height": 100
            },
            "content": "",
            "type": "springcm.Step",
            "position": {
                "x": 559,
                "y": 67
            },
            "angle": 0,
            "activityName": "HttpClientActivity",
            "group": "engineActivities",
            "icon": {
                "path": "http_client.svg#Dark",
                "color": "#f7b618"
            },
            "id": "3de29173-f63e-4b00-846a-13314ac7aa99",
            "z": 2000009,
            "name": {
                "type": "String",
                "value": "Get Clause Merge Data"
            },
            "stepDescription": {
                "type": "String",
                "value": ""
            },
            "requestContent": {
                "type": "String",
                "value": ""
            },
            "contentEncoding": {
                "type": "String",
                "value": "us-ascii"
            },
            "protocolVersion": {
                "type": "String",
                "value": "1.1"
            },
            "method": {
                "type": "String",
                "value": "GET"
            },
            "url": {
                "type": "Expression",
                "value": {
                    "code": "System.String.Concat(\n\"${SERVER_URL}/documents/\",\nGetVariableValue(\"DocumentId\"),\n\"/mergeData\"\n);",
                    "returnType": "System.Object",
                    "additionalCode": ""
                }
            },
            "headers": {
                "type": "InputUpdate",
                "value": [
                    {
                        "inputName": "Authorization",
                        "inputValue": "Bearer ${BEARER_TOKEN}"
                    }
                ]
            },
            "responseEncoding": {
                "type": "String",
                "value": "Auto"
            },
            "responseVariable": {
                "type": "Variable",
                "value": {
                    "type": "Xml",
                    "value": "ClauseMergeData"
                }
            },
            "responseStatusCodeVariable": {
                "type": "Variable",
                "value": {
                    "type": "Number",
                    "value": "MergeDataStatus"
                }
            },
            "responseHeadersXmlVariable": {
                "type": "Variable"
            },
            "attrs": {
                ".steptext": {
                    "ref-y": ".66",
                    "y-alignment": "middle",
                    "text": "Get Clause\nMerge Data",
                    "lineHeight": "1.4em"
                },
                ".description": {
                    "opacity": 0,
                    "ref": ".step-container",
                    "ref-x": 0.5,
                    "ref-dy": 0
                },
                ".descriptionbox": {
                    "width": 0,
                    "height": 0,
                    "rx": 0,
                    "ry": 0,
                    "x": 0,
                    "y": 0
                },
                ".descriptiontext": {
                    "text": ""
                },
                "use": {
                    "xlink:href": "/atlassupport/scripts/jointjs/svg/http_client.svg#Dark"
                },
                "svg": {
                    "color": "#f7b618",
                    "fill": "#fff"
                },
                "rect": {
                    "fill": "#f7b618"
                },
                ".step-container": {
                    "data-error-state": false
                }
            }
        },
        {
            "size": {
                "width": 100,
                "height": 100
            },
            "content": "",
            "type": "springcm.Step",
            "position": {
                "x": 228,
                "y": 63
            },
            "angle": 0,
            "activityName": "UpdateVariableActivity",
            "group": "engineActivities",
            "icon": {
                "path": "update_variable_value.svg#Dark",
                "color": "#d13393"
            },
            "id": "9efe9626-e516-4b9b-9036-a69eb9e8dc16",
            "z": 2000010,
            "name": {
                "type": "String",
                "value": "Get Document Id"
            },
            "stepDescription": {
                "type": "String",
                "value": ""
            },
            "notifyOnException": {
                "type": "Bool",
                "value": true
            },
            "variableUpdates": {
                "type": "VariableUpdate",
                "value": [
                    {
                        "variableToConfigure": {
                            "type": "Variable",
                            "value": {
                                "type": "String",
                                "value": "DocumentId"
                            }
                        },
                        "variableValue": {
                            "type": "Variable",
                            "value": {
                                "type": "Xml",
                                "value": "Params.Params.Documents.Document.Id"
                            }
                        }
                    }
                ]
            },
            "attrs": {
                ".steptext": {
                    "ref-y": ".66",
                    "y-alignment": "middle",
                    "text": "Get Document\nId",
                    "lineHeight": "1.4em"
                },
                ".description": {
                    "opacity": 0,
                    "ref": ".step-container",
                    "ref-x": 0.5,
                    "ref-dy": 0
                },
                ".descriptionbox": {
                    "width": 0,
                    "height": 0,
                    "rx": 0,
                    "ry": 0,
                    "x": 0,
                    "y": 0
                },
                ".descriptiontext": {
                    "text": ""
                },
                "use": {
                    "xlink:href": "/atlassupport/scripts/jointjs/svg/update_variable_value.svg#Dark"
                },
                "svg": {
                    "color": "#d13393",
                    "fill": "#fff"
                },
                "rect": {
                    "fill": "#d13393"
                },
                ".step-container": {
                    "data-error-state": false
                }
            }
        },
        {
            "size": {
                "width": 100,
                "height": 100
            },
            "content": "",
            "type": "springcm.Step",
            "position": {
                "x": 394,
                "y": 67
            },
            "angle": 0,
            "activityName": "UpdateVariableActivity",
            "group": "engineActivities",
            "icon": {
                "path": "update_variable_value.svg#Dark",
                "color": "#d13393"
            },
            "id": "79e80bce-26c8-4306-ad47-e3fb58ab8049",
            "z": 2000011,
            "name": {
                "type": "String",
                "value": "Get Merge Folder"
            },
            "stepDescription": {
                "type": "String",
                "value": ""
            },
            "notifyOnException": {
                "type": "Bool",
                "value": true
            },
            "variableUpdates": {
                "type": "VariableUpdate",
                "value": [
                    {
                        "variableToConfigure": {
                            "type": "Variable",
                            "value": {
                                "type": "String",
                                "value": "MergeFolder"
                            }
                        },
                        "variableValue": {
                            "type": "Variable",
                            "value": {
                                "type": "Xml",
                                "value": "Params.Params.Documents.Document.ParentFolderId"
                            }
                        }
                    }
                ]
            },
            "attrs": {
                ".steptext": {
                    "ref-y": ".66",
                    "y-alignment": "middle",
                    "text": "Get Merge\nFolder",
                    "lineHeight": "1.4em"
                },
                ".description": {
                    "opacity": 0,
                    "ref": ".step-container",
                    "ref-x": 0.5,
                    "ref-dy": 0
                },
                ".descriptionbox": {
                    "width": 0,
                    "height": 0,
                    "rx": 0,
                    "ry": 0,
                    "x": 0,
                    "y": 0
                },
                ".descriptiontext": {
                    "text": ""
                },
                "use": {
                    "xlink:href": "/atlassupport/scripts/jointjs/svg/update_variable_value.svg#Dark"
                },
                "svg": {
                    "color": "#d13393",
                    "fill": "#fff"
                },
                "rect": {
                    "fill": "#d13393"
                },
                ".step-container": {
                    "data-error-state": false
                }
            }
        }
    ]
};