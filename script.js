var ringer = {
    //countdown_to: MM/dd/YYYY",
    countdown_to: "11/25/2023",
    rings: {
        'DAYS': {
            s: 86400000, // mseconds in a day,
            max: 365
        },
        'HOURS': {
            s: 3600000, // mseconds per hour,
            max: 24
        },
        'MINUTES': {
            s: 60000, // mseconds per minute
            max: 60
        },
        'SECONDS': {
            s: 1000,
            max: 60
        },
    },
    r_count: 4,
    r_spacing: 10, // px
    r_size: 200, // px
    r_thickness: 7, // px
    update_interval: 11, // ms


    init: function () {

        var self = this;
        self.cvs = document.createElement('canvas');

        self.size = {
            w: (self.r_size + self.r_thickness) * self.r_count + (self.r_spacing * (self.r_count - 1)),
            h: (self.r_size + self.r_thickness)
        };

        self.cvs.setAttribute('width', self.size.w);
        self.cvs.setAttribute('height', self.size.h);
        self.ctx = self.cvs.getContext('2d');
        $(document.body).append(self.cvs);
        self.cvs = $(self.cvs);
        self.ctx.textAlign = 'center';
        self.actual_size = self.r_size + self.r_thickness;
        self.countdown_to_time = new Date(self.countdown_to).getTime();
        self.cvs.css({ width: self.size.w + "px", height: self.size.h + "px" });
        self.go();
    },
    ctx: null,
    go: function () {
        var self = this;
        var idx = 0;
        self.time = (new Date().getTime()) - self.countdown_to_time;
        for (var r_key in self.rings) self.unit(idx++, r_key, self.rings[r_key]);
        requestAnimationFrame(self.go.bind(self));
    },
    unit: function (idx, label, ring) {
        var self = this;
        var x, y, value, ring_secs = ring.s;
        value = parseFloat(self.time / ring_secs);
        self.time -= Math.round(parseInt(value)) * ring_secs;
        value = Math.abs(value);

        x = (self.r_size * .5 + self.r_thickness * .5);
        x += +(idx * (self.r_size + self.r_spacing + self.r_thickness));
        y = self.r_size * .5;
        y += self.r_thickness * .5;


        // calculate arc end angle
        var degrees = 360 - (value / ring.max) * 360.0;
        var endAngle = degrees * (Math.PI / 180);

        self.ctx.save();

        self.ctx.translate(x, y);
        self.ctx.clearRect(self.actual_size * -0.5, self.actual_size * -0.5, self.actual_size, self.actual_size);

        // first circle
        self.ctx.strokeStyle = "#ec90d8";
        self.ctx.beginPath();
        self.ctx.arc(0, 0, self.r_size / 2, 0, 2 * Math.PI, 2);
        self.ctx.lineWidth = self.r_thickness;
        self.ctx.stroke();

        // second circle
        self.ctx.strokeStyle = "#a1027f";
        self.ctx.beginPath();
        self.ctx.arc(0, 0, self.r_size / 2, 0, endAngle, 1);
        self.ctx.lineWidth = self.r_thickness;
        self.ctx.stroke();

        self.ctx.shadowColor = "#fff";  
        self.ctx.shadowBlur = 1;  
        self.ctx.shadowOffsetX = 1;  
        self.ctx.shadowOffsetY = 1;

        // label
        self.ctx.fillStyle = "#FFF";
        self.ctx.font = '25px Helvetica';
        self.ctx.fillText(label, 0, 23);
        self.ctx.lineWidth = 0.8;

        self.ctx.font = '25px Helvetica';
        self.ctx.fillText(label, 0, 23);
        
        self.ctx.lineWidth = 0.9;
        self.ctx.strokeText(label, 0, 23); //draw the text

        self.ctx.font = 'bold 60px Parisienne';
        self.ctx.fillText(Math.floor(value), 0, -5);
        self.ctx.strokeText(Math.floor(value), 0, -5);

        self.ctx.restore();
    }
}

ringer.init();