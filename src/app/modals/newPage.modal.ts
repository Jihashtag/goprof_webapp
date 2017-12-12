import { Component, OnDestroy, Inject } from "@angular/core";
// import { ModalDialogParams } from "nativescript-angular/directives/dialogs";
import {MAT_DIALOG_DATA} from '@angular/material';
import { Data } from "../shared/data/data.service";

// import * as camera from "nativescript-camera";
// import { Image } from "ui/image";

// import { ImageSource, fromAsset } from "image-source";
// import { ImageAsset } from "image-asset";

// var LoadingIndicator = require("nativescript-loading-indicator").LoadingIndicator;




declare var AVCaptureDevicePositionBack:any;
declare var UIImageOrientationRight:any;
declare var NSDataBase64EncodingEndLineWithLineFeed:any;
declare function alert(message:string);

// var imageModule = require("ui/image");
var img;
// var myImageSource: ImageSource;


@Component({
    moduleId: module.id,
    selector: "my-modal",
    templateUrl: "newPage.modal.html",
    styleUrls: ["newPage.modal.css"]
})
export class newpageModalComponent implements OnDestroy {
 
    public sources;
    public page = 'choice';
    // public loader = new LoadingIndicator();
    // public loaderOptions = {
    //     message: 'Une petite seconde...',
    //     progress: 0.65,
    //     android: {
    //         indeterminate: true,
    //         cancelable: false,
    //         max: 100,
    //         progressNumberFormat: "%1d/%2d",
    //         progressPercentFormat: 0.53,
    //         progressStyle: 1,
    //         secondaryProgress: 1
    //     },
    //     ios: {
    //         details: "Electron transporte ta photo a toute vitesse!",
    //         square: false,
    //         margin: 20,
    //         dimBackground: true,
    //         color: "#29536e"
    //     }
    //     };
    
    output; //camera output
    photoSrc = "";

    sockedSentCreatePageWithThis = this.sockedSentCreatePage.bind(this)
 
    public constructor(public data:Data, @Inject(MAT_DIALOG_DATA) private params:any) {
        this.sources = [
            {label:"Depuis mon appareil photo", value:"camera"},
            {label:"Depuis mes fichiers", value:"files"},
            {label:"Page blanche", value:"blank"},
            {label:"Page quadrillée", value:"grid"},
            {label:"Page isométrique", value:"isometric"},
            {label:"Dupliquer la page en cours", value:"copy"}
        ];

        if(params.bootOnCamera) this.page = "camera";



        this.data.socket.on('createPage', this.sockedSentCreatePageWithThis);

    }

    ngOnDestroy() 
    {
        this.data.socket.off('createPage', this.sockedSentCreatePageWithThis);
        console.log('destroyed...');
    }

    sockedSentCreatePage(page)
    {
        //la page a été crée on ferme le modal
        console.log("callback!");
        if(page.src == this.photoSrc) //c'est notre upload
        {
            // this.loader.hide();
            this.params.closeCallback("camera");
        }
        else if(page.pageType = "file")
        {
            // this.loader.hide();
            this.params.closeCallback("file");
        }
    }

    

 
    public close(res: string) {
        if(res == "camera") this.page = "camera";
        else if(res == "files") this.page = "files";

        else this.params.closeCallback(res);
        console.log("modal.close");
    }

    public useFile(file)
    {
        // this.loader.show(this.loaderOptions);
        //envoi au serveur, le serveur va comprendre que c'est une page de type file et ajouter les données hires depuis le serveur
        
        this.data.socket.emit('createPage',{ pageType : "file", title: file.title, conversationID : 0, src : file.src, thumbnail: file.thumbnail });
        console.log("modal.usefile");
    }



    creatingView(e: any) {



        // var session = new AVCaptureSession();

        //     session.sessionPreset = AVCaptureSessionPreset1920x1080;


        //     // Adding capture device
        //     //var device = AVCaptureDevice.defaultDeviceWithMediaType(AVMediaTypeVideo);
        //     var device = AVCaptureDevice.defaultDeviceWithDeviceTypeMediaTypePosition("AVCaptureDeviceTypeBuiltInWideAngleCamera",AVMediaTypeVideo,AVCaptureDevicePositionBack);
        //     //var device = AVCaptureDevice.cameraWithPosition(AVCaptureDevicePositionFront);

        //     var input = AVCaptureDeviceInput.deviceInputWithDeviceError(device);
        //     if (!input) {
        //         throw new Error("Error trying to open camera.");
        //     }
        //     session.addInput(input);


        //     this.output = new AVCaptureStillImageOutput();
        //     session.addOutput(this.output);


        //     session.startRunning();

            
        //     var videoLayer = AVCaptureVideoPreviewLayer.layerWithSession(session);
            
          
        //     var view = UIView.alloc().initWithFrame({ origin: { x: 0, y: 0 }, size: { width: 375, height: 603 } }); 
            
        //     videoLayer.frame = view.bounds;
        //     view.layer.addSublayer(videoLayer);

            

        //     e.view = view;
        console.log("modal.creatingview");
    }

    takePicture()
    {
        // //
        //     this.loader.show(this.loaderOptions);
        //     var videoConnection = this.output.connections[0];
        
        //     this.output.captureStillImageAsynchronouslyFromConnectionCompletionHandler(videoConnection, (buffer, error) => {
            
        //     var imageData = AVCaptureStillImageOutput.jpegStillImageNSDataRepresentation(buffer);
        //     var image = UIImage.imageWithData(imageData);

        //     AudioServicesPlaySystemSound(144);
            
        //     var image = UIImage.imageWithCGImageScaleOrientation(image.CGImage,1,UIImageOrientationRight);

        //     UIGraphicsBeginImageContextWithOptions(CGSizeMake(750, 1206), true, image.scale); //soit image.size soit CGSizeMake(100.0, 100.0)
        //     image.drawInRect(CGRectMake(0, -64, 750, 1270)); //dessine par dessus le canvas, ça déborde un peu au dessus et en dessous
        //     var rotatedimage =  UIGraphicsGetImageFromCurrentImageContext();
        //     UIGraphicsEndImageContext();
            
        
        //     var b64encoded = UIImageJPEGRepresentation(rotatedimage,0.6).base64EncodedStringWithOptions(NSDataBase64EncodingEndLineWithLineFeed);
        //     this.photoSrc = "data:image/jpg;base64,"+b64encoded;
            this.page = "choice";

            this.data.socket.emit('createPage',{ pageType : "camera", conversationID : 0, src : this.photoSrc });

        //     //passer sur la page "loading" avec un listener sur le socket qui dit quand l'image est bien arrivé.


        //     //this.appRef.tick();
        // });
        console.log("modal.takePicture");
        
    }

    cancelTakePicture()
    {
        this.page = "choice";
    }



 
}

